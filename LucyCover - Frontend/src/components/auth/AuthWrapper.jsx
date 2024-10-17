import style from "./css/AuthWrapper.module.css";

const AuthWrapper = (props) => {
    return (
        <>
            {
                props.error && (
                    <div className={style.ErrorNotyficationBox}>
                        {
                            props.error.map((e,index) => (
                                <div key={index} className={style.Error}>
                                    <h6>{e}</h6>
                                    <small>{props.error.message}</small>
                                </div>
                            ))
                        }
                    </div>
                )
            }
            <div className={style.Container}>
                <div className={style.LeftSide}></div>
                <div className={style.RightSide}>
                    <div className={style.AuthBox}>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthWrapper