import { Navigate } from "react-router-dom";
import AuthPageComponent from "../../components/auth/AuthPageComponent";
import { useCookies } from "react-cookie";

/**
 * AuthPage - The main route to authentication page
 * It basis on the authCookie which existing is condition of page display. In other cases user will be redirected to /dashboard/schedule (user is already logged in)
 * @component
 */

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
