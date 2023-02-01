import {useAuth} from "./../../context/";

function AdminProfile() {
    const {user} = useAuth();
    return (
        <div>
           {JSON.stringify(user)} 
        </div>
    )
}

export default AdminProfile
