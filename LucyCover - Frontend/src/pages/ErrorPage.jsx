import { Navigate } from "react-router-dom"
import { useCookies } from "react-cookie";

/**
 * ErrorPage - When error occured this page will be loaded
 * If user is trying display not existing or unavailable resources ErrorPage will redirect him to one of the pages [authPage / dashboard] depending on authCookie which indicate if user are logged or not.
 *
 * @component
 */

const ErrorPage = () => {
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

export default ErrorPage