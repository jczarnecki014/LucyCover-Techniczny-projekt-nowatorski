import style from "./css/LoginComponent.module.css"
import logo from "../../assets/images/logo_graphics/logo.png"
import LabelInput from "../utility/LabelInput"

const LoginComponent = () => {
    return (
        <div className={style.Container}>
            <div className={style.LogoSection}>
                <img src={logo} />
            </div>
            <form className={style.InputsSection}>
                <LabelInput controlId="userEmail" className={style.Input} label="Twój email" inputType="email"  required />
                <LabelInput controlId="userPassword" className={style.Input} label="Twoje hasło" inputType="password" required />
                <button id={style.LoginButton}>ZALOGUJ SIĘ</button>
                <button id={style.SwitchModeButton}>ZAREJESTRUJ KONTO</button>
                <small>Masz problem z uzyskaniem dostępu do konta ? <a>Zrestetuj hasło</a></small>
            </form>
        </div>
    )
}

export default LoginComponent