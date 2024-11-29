//Components
import AuthWrapper from "./AuthWrapper"
import LoginComponent from "./LoginComponent"
import RegisterComponent from "./RegisterComponent"
//Hooks
import { AnimatePresence } from "framer-motion"
import { useState } from "react"

/**
 * variant - declare entering and leaving animation for LoginComponent and RegisterComponent
 */

const variants = {
    hidden: {
        x:500,
        opacity:0,
        transition: {
            duration:"0.3"
        }
    },
    visible:{
        x:0, 
        opacity:1,
        transition: {
            duration:"0.3"
        }
    },
    exit:{
        x:-500,
        opacity:0,
        transition: {
            duration:"0.3"
        } 
    }
}

/**
 * AuthPageComponent - component to manage authentication phase
 * 
 *  [1] - fluently switching between Login / Register mode
 * 
 *  [2] - Storing authentication error for botch login and register mode
 */

const AuthPageComponent = () => {
    const [isLogin,SetIsLogin] = useState(true) //[loginMod => true | registerMod => false]
    const [pageIsChanging,SetPageIsChanging] = useState(false); // condition to complete mode switching
    const [authError,SetAuthError] = useState(null)

    const SwitchModeButtonClick = () => {
        SetPageIsChanging(true)
        SetAuthError(null)

        setTimeout(()=>{
            SetIsLogin(!isLogin)
            SetPageIsChanging(false)
        },300)

    }

    return (
        <AuthWrapper error={authError}>
            <AnimatePresence>
                {
                    (isLogin && !pageIsChanging) && <LoginComponent 
                        variants={variants} 
                        ChangeMode={SwitchModeButtonClick}
                        SetError={SetAuthError} />
                }
                {
                    (!isLogin && !pageIsChanging) && <RegisterComponent 
                        variants={variants} 
                        ChangeMode={SwitchModeButtonClick} 
                        SetError={SetAuthError} />
                }
            </AnimatePresence>
        </AuthWrapper>
    )
}

export default AuthPageComponent;