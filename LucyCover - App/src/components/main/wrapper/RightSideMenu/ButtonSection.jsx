import {Row,Col} from 'react-bootstrap'

import {motion} from 'framer-motion'

import style from '../css/RightSideMenu.module.css'

const ButtonSection = () => {
    return (
        <Row className='d-flex justify-content-center pt-5'>
            <Col xs={10} className={style.Button_Section}>
                <motion.button whileHover={{scale:1.1,backgroundColor:'#EEE', color:'#5C5C5C'}} id={style.Management_Button}>
                    ZARZĄDZAJ
                </motion.button>
                <motion.button whileHover={{scale:1.1,backgroundColor:'#BA50B7'}} id={style.Logout_Button}>
                    WYLOGUJ
                </motion.button>
            </Col>
        </Row>
    )
}

export default ButtonSection;