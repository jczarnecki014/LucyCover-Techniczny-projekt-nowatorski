import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { SetLoginInputs } from "../../context/slices/AuthForm"
import LoadingSpinner from '../utility/LoadingSpinner'
import style from "./css/LoginComponent.module.css"
import logo from "../../assets/images/logo_graphics/logo.png"
import LabelInput from "../utility/LabelInput"
import {motion} from "framer-motion"
import { LogIn } from "../../api/https"
import {useFormData} from '../../hooks/useFormData'
import { useCookies } from "react-cookie";



const LoginComponent = ({variants,ChangeMode,SetError}) => {
    const dispatch = useDispatch()
    const [cookies,setCookie] = useCookies(['authCookie']);
    const loginForm = useSelector(state => state.authForm.loginDetails)

    const getValue = useFormData()

    const {mutate,isPending} = useMutation({
        mutationFn: LogIn,
        onSuccess: (data) => {
            const jsonData = JSON.stringify(data);
            setCookie('authCookie',jsonData, {path:'/',expires: new Date(data.tokenTime) })
        },
        onError: (error) => {
            const errors = [error.message];
            console.log(errors)
            SetError(errors);
        }
    })

    const FormSubmitHandler = (event) => {
        event.preventDefault();
        const formValue = getValue(loginForm)
        mutate({
            email: formValue.email,
            password: formValue.password
        })
    }

    const InputChangeHandler = (inputObject) => {
        dispatch(SetLoginInputs(inputObject))
    }


    return (
            <motion.div variants={variants} initial="hidden" animate="visible" exit="exit" className={style.Container}>
                <div className={style.LogoSection}>
                    <img src={logo} />
                </div>
                <form className={style.InputsSection} onSubmit={FormSubmitHandler}>
                    {
                        isPending && <LoadingSpinner />
                    }
                    {
                        !isPending && (
                            <>
                            <LabelInput 
                                controlId="email" 
                                className={style.Input} 
                                label="Twój email" 
                                inputType="email" 
                                onInput={InputChangeHandler}  
                                required />

                            <LabelInput 
                                controlId="password" 
                                className={style.Input} 
                                label="Twoje hasło" 
                                inputType="password" 
                                onInput={InputChangeHandler} 
                                required />

                            <button id={style.ActionButton}>ZALOGUJ SIĘ</button>
                            <button id={style.SwitchModeButton} onClick={ChangeMode}>ZAREJESTRUJ KONTO</button>
                            <small>Masz problem z uzyskaniem dostępu do konta ? <a>Zrestetuj hasło</a></small>
                            </>
                        )
                    }
                </form>
            </motion.div>
    )
}

export default LoginComponent