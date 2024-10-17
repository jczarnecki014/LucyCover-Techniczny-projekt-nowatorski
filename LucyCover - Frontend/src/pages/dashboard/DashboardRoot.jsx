import Wrapper from "../../components/dashboard/wrapper/Wrapper";
import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
const DashboardRoot = () => {
    const [cookies,setCookie] = useCookies(['authCookie'])
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