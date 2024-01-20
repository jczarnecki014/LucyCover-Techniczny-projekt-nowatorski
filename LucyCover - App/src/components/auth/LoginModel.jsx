
import {Row,Col,Image,Form} from 'react-bootstrap'

import LabelInput from '../utility/LabelInput'
import AuthButtons from './AuthButtons'

import LogoSRC from '../../assets/images/logo_graphics/logo.png'

import style from './css/ModelsStyles.module.css'

import {path as CreateAccountPagePath} from '../../pages/auth/CreateAccountPage'
import { CheckEmailIsValid } from '../../assets/auth/Validation/EmailValidation'

const LoginModel = () => {
    return (
        <Row className='d-flex justify-content-center pt-5'>
            <Col sm='12' md='5' className='mb-2'>
                <Image src={LogoSRC} className={style.image_logo} fluid/>
            </Col>
            <Col sm='12' md="10">
                <Form>
                    <LabelInput 
                        id='EmailInput' 
                        label="Adres email" 
                        inputType="email" 
                        placeholder='Wpisz swój adres email' 
                        validationFunction={CheckEmailIsValid} />

                    <LabelInput id='PasswordInput' label="Hasło" inputType="password" placeholder='Twoje hasło' />

                    <AuthButtons 
                        MainButtonOption={{buttonText:'Zaloguj się'}} 
                        ToggleButtonOption={{buttonText:'Zarejestruj się', 
                        togglePath: CreateAccountPagePath}} />

                        
                    <a href='#' className={style.CountAccessRestoreLink}>
                        Zapomniałem hasło / Nie mam dostępu do konta
                    </a>
                </Form>
            </Col>
        </Row>
    )
}

export default LoginModel