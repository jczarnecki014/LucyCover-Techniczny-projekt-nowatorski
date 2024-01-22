import { Row,Col } from "react-bootstrap"

import { BsCalendarDate } from "react-icons/bs";
import { IoPeople } from "react-icons/io5";
import { GiOpenBook } from "react-icons/gi";
import { IoMdMail } from "react-icons/io";

import MainMenuElement from "./MainMenuElement";

import style from '../css/MainMenu.module.css'


const MainMenu = () => {
    return (
            <Row className={`${style.Main_Menu} bg-lightPink d-flex justify-content-center py-3`}>
                <MainMenuElement title="Kalendarz wizyt" className='me-3'>
                    <BsCalendarDate size={70} color="#fff"/>
                </MainMenuElement>
                <MainMenuElement title="Pacjenci" className='me-3'>
                    <IoPeople  size={70} color="#fff"/>
                </MainMenuElement>
                <MainMenuElement title="Materiały edukacyjne" className='me-3'>
                    <GiOpenBook size={70} color="#fff"/>
                </MainMenuElement>
                <MainMenuElement title="Korespondencja">
                    <IoMdMail  size={70} color="#fff"/>
                </MainMenuElement>
            </Row>
    )
}

export default MainMenu