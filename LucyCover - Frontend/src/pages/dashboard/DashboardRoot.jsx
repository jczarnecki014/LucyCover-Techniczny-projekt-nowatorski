import Wrapper from "../../components/dashboard/wrapper/Wrapper";
import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

/**
 * DashboardRoot - Wrapper page of main aplication content
 * 
 *
 * @component
 */

const DashboardRoot = () => {
    const [cookies] = useCookies(['authCookie'])
    const isAuthenticated = cookies.authCookie;

    if(!isAuthenticated)
    {
        return <Navigate to="/auth" replace={true} />
    }

    return (
        <Wrapper>
            <Outlet />
        </Wrapper>
    )
}
export default DashboardRoot;