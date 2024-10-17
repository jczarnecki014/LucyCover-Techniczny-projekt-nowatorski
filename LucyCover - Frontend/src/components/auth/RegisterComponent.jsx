import style from "./css/RegisterComponent.module.css"
import logo from "../../assets/images/logo_graphics/logo.png"
import LabelInput from "../utility/LabelInput"
import {motion} from 'framer-motion'
import { useSelector, useDispatch } from "react-redux"
import { SetRegisterInputs } from "../../context/slices/AuthForm"
import { useFormData } from "../../hooks/useFormData"
import { CreateAccount } from "../../api/https"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import img from '../../assets/images/auth/success.gif'

const RegisterComponent = ({variants,ChangeMode,SetError}) => {
    const dispatch = useDispatch();
    const [registerSuccess,SetRegisterSuccess] = useState(false);
    const registerForm = useSelector(state => state.authForm.registerDetails)

    const getValue = useFormData()

    const {mutate,isPending} = useMutation({
        mutationFn: CreateAccount,
        onSuccess: () => {
            SetRegisterSuccess(true)
            SetError(null)
        },
        onError: (error) => {
            const test = error.message.split("|")
            SetError(test)
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
            {
                registerSuccess && (
                    <div className={style.RegisterSuccessBox}>
                        <section className={style.Header}>
                            <img src={img} />
                            <h4>Pomyślnie utworzono twoje konto !</h4>
                        </section>
                        <section className={style.Content}>
                            <h6>Witaj !</h6>
                            <p>Twoje nowe konto użytkownika zostało utworzone w systemie LucyCover. Drogi użytkowniku, od teraz możesz zarządzać swoimi pacjentami z tego jednego bezpiecznego miejsca. </p>
                            <p> Pamiętaj również o zachowaniu procedur bezpieczeństwa podczas przetwarzania danych medycznych. <b>Są to dane szczególnie wrażliwe</b>, które nie powinny być widziane przez osoby trzecie. <b>Ustaw ekran swojego monitora w taki sposób aby był widoczny tylko przez ciebie.</b> System zadba o to aby dane przez ciebie wprowadzane były przetwarzane oraz przechowywane w jak najbardziej bezpieczny sposób zgodny z aktualnymi standardami bezpieczenstwa informatycznego.</p>
                            <button id={style.ActionButton} style={{marginTop: 40}} onClick={ChangeMode}>ZALOGUJ SIĘ</button>
                        </section>
                    </div>
                )
            }
            {
               !registerSuccess && 
               (
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
               )
            }

        </motion.div>
    )
}

export default RegisterComponent