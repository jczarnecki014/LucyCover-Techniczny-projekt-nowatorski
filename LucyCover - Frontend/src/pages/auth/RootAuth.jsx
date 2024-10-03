import { Outlet } from "react-router-dom";

import AuthWrapper from "../../components/auth/AuthWrapper";

const RootAuth = () => {
    return (
           <AuthWrapper>
                <Outlet />
           </AuthWrapper>
    )
}

export default RootAuth;
