import { useContext } from "react"
import { AuthProvider } from "../context/AuthContext"
import { Navigate } from "react-router-dom";



const ProtectRoute = ({child}) => {
    const {user} = useContext(AuthProvider);
    if( !user){
        return <Navigate to="/login"/>
    }

    return child
}

export default ProtectRoute;