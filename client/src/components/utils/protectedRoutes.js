import {Navigate} from 'react-router-dom'
import {useAuth} from "./../../context/";

export default function ProtectedRoutes({children, admin, ...rest}) {
    
    const {user} = useAuth();
    return (
        (admin && user.role !== "admin" && (<Navigate to="/"/>)) 
        || 
        (user ? children : <Navigate to="/"/>)
    )
}
