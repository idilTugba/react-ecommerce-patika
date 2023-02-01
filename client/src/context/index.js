import { useState, useEffect, createContext, useContext } from "react";
import { fetchMe, fetchLogout } from "../api";
import { Spinner, Flex } from "@chakra-ui/react"

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        (async () => {
            try{
                const me = await fetchMe();
                setUser(me);
                setLoggedIn(true);
                setLoader(false);
            } catch(e){
                setLoader(false);
            }
        })()
    },[]);

    const login = (data, callback) => {
        setLoggedIn(true);
        setUser(data.user);

        localStorage.setItem('access-token', data.accessToken);
        localStorage.setItem('refresh-token', data.refreshToken);

        callback();
    }

    const logout = async (callback) =>{
        setUser(null);
        setLoggedIn(false);

        await fetchLogout();
        localStorage.removeItem('refresh-token')
        localStorage.removeItem('access-token')

        callback();
    }
    
    const values = {
        user,
        loggedIn,
        login,
        logout
    }


    if(loader){
        return (
            <Flex justifyContent="center" alignItems="center" height="100vh">
                <Spinner thickness="4px" emptyColor="grey.200" speed="0.03s" size="xl" color="pink.300"></Spinner>
            </Flex>
        )
    }
    return <AuthContext.Provider value={values}> {children} </AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext);

export {
    AuthProvider,
    useAuth
}