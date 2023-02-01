import React from 'react'
import styles from './styles.module.css'
import {Link, useNavigate} from "react-router-dom";
import { Button } from '@chakra-ui/react'
import {useAuth} from "./../../context/";
import {useCard} from "./../../context/cardContext";


export default function Navbar() {
    const {loggedIn, logout, user} = useAuth();
    const {cardItem} = useCard();
    let navigate = useNavigate(); 

    const handleLogout = async ()=>{
        logout(()=>{
            navigate("/")
        });
    }

    return (
      <div className={styles.nav} id="sidebar">
  
        <div>
            <Link to={`/`}>EU eCommerce</Link>
            <Link to={`/products`}>products</Link>
        </div>
        <div>
            {!loggedIn ?
                (<>
                    <Link to="/signin">
                        <Button colorScheme='blue'>Login</Button>
                    </Link>
                    <Link to="/signup">
                        <Button colorScheme='blue'>Register</Button>
                    </Link>
                </>) 
                : 
                (<>
                    
                    {(user && user.role === "admin") ? (
                        <Link to="/admin/profile">
                            <Button colorScheme="pink" variant="ghost">Admin</Button>
                        </Link>
                    ):(
                        <Link to="/profile">
                            <Button colorScheme='blue'>Profile</Button>
                        </Link>
                    )}

                    {cardItem.length > 0 && (
                        <Link to="/basket"><Button colorScheme='blue'>{cardItem.length}</Button></Link> 
                    )}
                    
                    <Button onClick={handleLogout} colorScheme='blue'>Logout</Button>
                </>)
            }
        </div>
        
      </div>
      
    )
}

