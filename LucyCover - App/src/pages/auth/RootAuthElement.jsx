import { Outlet } from "react-router-dom";

import {Container,Row,Col,Image} from 'react-bootstrap'

import root_page_1 from '../../../public/auth/root_page_1.jpg'

import style from './css/RootAuthElement.module.css'


const RootAuthElement = () => {
    return (
        <>
            <Container className={style.rootContainer} fluid>
                <Row>
                   <Col md={6} className={style.backdropColumn}>
                        <Row className="d-flex">
                            <Col md={6}>
                                <Image className='p-0 m-0' src={root_page_1} fluid/>
                            </Col>
                            <Col md={6}>
                                <Image className="p-0 m-0" src={root_page_1} fluid/>
                            </Col>
                        </Row>
                   </Col>
                   <Col md={6} className={style.formColumn}>
                        2
                   </Col>
                </Row>
            </Container>
        </>
    )
}

export default RootAuthElement;


// Dodaj outlet