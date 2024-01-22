import { Fragment } from 'react'

import {Row,Col,Image,Form} from 'react-bootstrap'

import LabelInput from '../utility/LabelInput'
import AuthButtons from './AuthButtons'

import LogoSRC from '../../assets/images/logo_graphics/logo.png'

import style from './css/ModelsStyles.module.css'

import {path as LoginPagePath} from '../../pages/auth/LoginPage'
import { CheckEmailIsValid } from '../../assets/auth/Validation/EmailValidation'

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
                        <LabelInput controlId="UserNameInput" label="Nazwa użytkownika" type="text" placeholder="Wpisz twoją nazwę użytkownika" className='mb-3' />
                        <LabelInput 
                            controlId="EmailInput" 
                            label="Adres email" 
                            inputType="email" 
                            placeholder="Wpisz swój adres email"  
                            validationFunction={CheckEmailIsValid}
                            className='mb-3'
                        />
                        <LabelInput controlId="PasswordInput" label="Hasło" inputType="password" placeholder="Wpisz twoje hasło" className='mb-3' />
                        <LabelInput controlId="RePasswordInput" label="Powtórz hasło" type="password" placeholder="Wpisz hasło ponownie" className='mb-3' />
                        <AuthButtons MainButtonOption={{buttonText:'Zarejestruj się'}} ToggleButtonOption={{buttonText:'Zaloguj się',togglePath:LoginPagePath}} />
                    </Form>
                </Col>
            </Row>
        </Fragment>
    )
}

export default CreateAccountModel