
import {Row,Col,Image,Form} from 'react-bootstrap'

import LogoSRC from '../../assets/images/logo/logo.png'

import style from './css/LoginPage.module.css'

const CreateAccountPage = () => {
    return (
        <Row className='d-flex justify-content-center pt-5'>
            <Col sm='12' md='3' className='mb-2'>
                <Image src={LogoSRC} className={style.image_logo} fluid/>
            </Col>
            <Col sm='12' md="10">
                <Form>
                    <Form.Group className="mb-3" controlId="EmailInput">
                        <Form.Label>Adres Email</Form.Label>
                            <input type="email" placeholder='Wpisz swój adres email' />
                            {/* <Form.Control type="email" placeholder="Wpisz swój adres email" /> */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="PasswordInput">
                            <Form.Label>Hasło</Form.Label>
                            <input type="password" placeholder='Twoje hasło' />
                        </Form.Group>
                        <button type="submit" className={style.LoginButton}>
                            ZALOGUJ SIĘ
                        </button>
                        <button type="submit" className={style.AuthSwitchButton}>
                            ZAREJESTRUJ KONTO
                        </button>
                            <a href='#' className={style.CountAccessRestoreLink}>
                                Zapomniałem hasło / Nie mam dostępu do konta
                            </a>
                    </Form>
            </Col>
        </Row>
    )
}

export default CreateAccountPage