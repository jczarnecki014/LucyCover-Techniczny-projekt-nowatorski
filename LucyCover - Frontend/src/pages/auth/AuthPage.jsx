import { Navigate } from "react-router-dom";
import AuthPageComponent from "../../components/auth/AuthPageComponent";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";

const AuthPage = () => {
    const [cookies,setCookie] = useCookies(['authCookie'])
    const isAuthenticated = cookies.authCookie;
    
    if(isAuthenticated)
    {
        return <Navigate to="/dashboard/schedule" />
    }
    return (
        <AuthPageComponent />
    )
}

export default AuthPage;
