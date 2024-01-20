import { Row,Col, Image } from "react-bootstrap";
import { IconContext } from "react-icons";

import style from './css/TopBar.module.css'

import logo_small from '../../../assets/images/logo_graphics/logo_horizontal.png'
import { FaArrowCircleLeft } from "react-icons/fa";

const TopBar = () => {
    return (
        <Row className={style.top_bar}>
            <Col xs={3} md={1} className='ms-5'>
                <Image src={logo_small} fluid />
            </Col>
            <Col xs={6} md={10} className="d-flex justify-content-end align-items-center">
                <IconContext.Provider value={{className: style.back_button}}>
                    <FaArrowCircleLeft size={25} color="#fff" />
                </IconContext.Provider>
            </Col>
        </Row>
    )
}

export default TopBar;