import { useState } from "react"
import AuthWrapper from "./AuthWrapper"
import LoginComponent from "./LoginComponent"
import RegisterComponent from "./RegisterComponent"
import { AnimatePresence } from "framer-motion"
import { BsNutFill } from "react-icons/bs"

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


const AuthPageComponent = () => {
    const [isLogin,setIsLogin] = useState(true) //[login/register]
    const [pageIsChanging,setPageIsChanging] = useState(false);
    const [authError,SetAuthError] = useState(null)

    console.log(authError)

    const SwitchModeButtonClick = () => {
        setPageIsChanging(true)
        SetAuthError(null)

        setTimeout(()=>{
            setIsLogin(!isLogin)
            setPageIsChanging(false) // [{inputName:"errorMessage"}]
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