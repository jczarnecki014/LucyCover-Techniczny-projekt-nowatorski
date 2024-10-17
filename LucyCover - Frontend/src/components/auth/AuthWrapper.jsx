import style from "./css/AuthWrapper.module.css";

const AuthWrapper = (props) => {
    return (
        <div className={style.Container}>
            <div className={style.LeftSide}></div>
            <div className={style.RightSide}>
                <div className={style.AuthBox}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default AuthWrapper