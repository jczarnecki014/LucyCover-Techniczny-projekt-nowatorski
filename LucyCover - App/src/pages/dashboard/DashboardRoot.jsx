import Wrapper from "../../components/dashboard/wrapper/Wrapper";
import { Outlet } from "react-router-dom";
const DashboardRoot = () => {
    return (
        <Wrapper>
            <Outlet />
        </Wrapper>
    )
}
export default DashboardRoot;