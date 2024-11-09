import style from "./css/AuthWrapper.module.css";

/**
 * AuthWrapper - component to wrapp login and register component.
 * 
 * Functionality: 
 * 
 *  [1] - It provide same background and structure for both modes
 * 
 *  [2] - Displaying errors occured during authentication
 * 
 * Params:
 * 
 *  @param {object} error - error to display
 * 
 *  @param {object} children - wrapped elements
 */

const AuthWrapper = ({error,children}) => {
    return (
        <>
            {
                error && (
                    <div className={style.ErrorNotyficationBox}>
                        {
                            error.map((e,index) => (
                                <div key={index} className={style.Error}>
                                    <h6>{e}</h6>
                                    <small>{error.message}</small>
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
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthWrapper