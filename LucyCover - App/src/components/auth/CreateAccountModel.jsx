import { Fragment } from 'react'

import {Row,Col,Image,Form} from 'react-bootstrap'

import LabelInput from '../utility/LabelInput'
import AuthButtons from './AuthButtons'

import LogoSRC from '../../assets/images/logo/logo.png'

import style from './css/ModelsStyles.module.css'

import {path as LoginPagePath} from '../../pages/auth/LoginPage'
import { CheckEmailIsValid } from '../../assets/images/auth/Validation/EmailValidation'

const CreateAccountModel = () => {

    return (
        <Fragment>
            <Row>
                <Col sm='12' md='2' >
                    <Image src={LogoSRC} className={style.image_logo} fluid/>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center pt-1'>
                <Col sm='12' md="10">
                    <Form>
                        <LabelInput id="UserNameInput" label="Nazwa użytkownika" type="text" placeholder="Wpisz twoją nazwę użytkownika" />
                        <LabelInput 
                            id="EmailInput" 
                            label="Adres email" 
                            inputType="email" 
                            placeholder="Wpisz swój adres email"  
                            validationFunction={CheckEmailIsValid}
                        />
                        <LabelInput id="PasswordInput" label="Hasło" inputType="password" placeholder="Wpisz twoje hasło" />
                        <LabelInput id="RePasswordInput" label="Powtórz hasło" type="password" placeholder="Wpisz hasło ponownie" />
                        <AuthButtons MainButtonOption={{buttonText:'Zarejestruj się'}} ToggleButtonOption={{buttonText:'Zaloguj się',togglePath:LoginPagePath}} />
                    </Form>
                </Col>
            </Row>
        </Fragment>
    )
}

export default CreateAccountModel