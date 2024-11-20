import { Navigate } from "react-router-dom"
import { useCookies } from "react-cookie";

/**
 * RedirectPage - When user try to display base path "./" redirect him to correct path as:
 * 
 *  domain.com/dashboard/schedule
 * 
 *  domain.com/auth
 * @component
 */

const RedirectPage = () => {
    const [cookies] = useCookies(['authCookie'])
    const isAuthenticated = cookies.authCookie;
    
    if(isAuthenticated)
    {
        return <Navigate to="/dashboard/schedule" />
    }

    return (
        <Navigate to="/auth" />
    )
}

export default RedirectPage