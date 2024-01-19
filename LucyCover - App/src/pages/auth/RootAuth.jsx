import { Outlet } from "react-router-dom";

import ModelWrapper from "../../components/auth/ModelWrapper";

const RootAuth = () => {
    return (
           <ModelWrapper>
                <Outlet />
           </ModelWrapper>
    )
}

export default RootAuth;


// Dodaj outlet