//components
import LabelInput from "@components/utility/LabelInput"
import {motion} from 'framer-motion'
//style
import style from "./css/RegisterComponent.module.css"
//hooks
import { useFormData } from "@hooks/useFormData"
import { useSelector, useDispatch } from "react-redux"
import { useMutation } from "@tanstack/react-query"
//redux
import { SetRegisterInputs } from "@context/slices/AuthForm"
//assets
import logo from "@assets/images/logo_graphics/logo.png"
//api
import { CreateAccount } from "@api/https"


/**
 * RegisterComponent - component to manage register mode
 * 
 * Functionality: 
 * 
 *  [1] - Displaying and manage register form and validation
 * 
 *  [2] - Posting new user details to backend and depending on the response displaying success view or seting error list
 * 
 * Params:
 * 
 *  @param {object} variants - variants defines entering and leaving login form from screen
 * 
 *  @param {function} ChangeMode - Function to switching between login form and register form
 * 
 *  @param {function} SetError - Function to setting error list recived from backend (it will be displaed in wrapper component)
 * 
 */

const RegisterComponent = ({variants,ChangeMode,SetError}) => {
    const dispatch = useDispatch();
    const registerForm = useSelector(state => state.authForm.registerDetails)

    const getValue = useFormData()

    const {mutate,isPending} = useMutation({
        mutationFn: CreateAccount,
        onSuccess: () => {
            alert("Utworzono konto pomyślnie")
            ChangeMode();
            SetError(null)
        },
        onError: (error) => {
            const errorDetails = error.message.split("|")
            SetError(errorDetails)
        }
    })

    const FormSubmitHandler = (event) => {
        event.preventDefault();
        const formValue = getValue(registerForm)
        mutate(formValue)
    }

    const InputChangeHandler = (inputObject) => {
        dispatch(SetRegisterInputs(inputObject))
    }

    return (
        <motion.div variants={variants} initial="hidden" animate="visible" exit="exit" className={style.Container}>
            <div className={style.LogoSection}>
                <img src={logo} />
            </div>
                <form onSubmit={FormSubmitHandler}>
                    <section className={style.InputSection}>
                        <LabelInput 
                            controlId="firstAndLastName" 
                            label="Imie i nazwisko" 
                            className={style.Input} 
                            onInput={InputChangeHandler} 
                            required />

                        <LabelInput 
                            controlId="email" 
                            label="Email" 
                            inputType="email"
                            className={style.Input} 
                            onInput={InputChangeHandler}
                            required />

                        <LabelInput 
                            controlId="password"
                            label="Hasło"
                            inputType="password"
                            className={style.Input}
                            onInput={InputChangeHandler}
                            required />

                        <LabelInput 
                            controlId="rePassword" 
                            label="Powtórz hasło"
                            inputType="password" 
                            className={style.Input} 
                            onInput={InputChangeHandler}
                            required />
                        {isPending && <small>Trwa rejesracja..</small>}
                    </section>
                    <section className={style.ButtonSection}>
                        <button id={style.ActionButton}>ZAREJESTRUJ KONTO</button>
                        <button id={style.SwitchModeButton} onClick={ChangeMode}>Zaloguj się </button>
                    </section>   
                </form>

        </motion.div>
    )
}

export default RegisterComponent