import { Outlet } from "react-router-dom";

import image_1 from '../../assets/images/auth/root_backdrop_image_1.jpg'

import {Container,Row,Col} from 'react-bootstrap'

import style from './css/RootAuthElement.module.css'


const RootAuth = () => {
    return (
        <>
           <Container className={style.root_container} fluid>
                <Row>
                    <Col md='6' className={style.root_mosaic_side}>1</Col>
                    <Col md='6'>2</Col>
                </Row>
           </Container>
        </>
    )
}

export default RootAuth;


// Dodaj outlet