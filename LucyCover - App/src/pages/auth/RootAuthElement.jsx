import { Outlet } from "react-router-dom";

const RootAuthElement = () => {
    return (
        <>
            <h1>RootElement</h1>
            <Outlet />
        </>
    )
}

export default RootAuthElement;