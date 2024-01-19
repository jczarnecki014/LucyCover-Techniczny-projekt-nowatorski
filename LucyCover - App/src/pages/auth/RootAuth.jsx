import { Outlet } from "react-router-dom";


import {Container,Row,Col} from 'react-bootstrap'

import style from './css/RootAuthElement.module.css'


const RootAuth = () => {
    return (
        <>
           <Container className={style.root_container} fluid>
                <Row>
                    <Col md='4' className={style.root_mosaic_side}></Col>
                    <Col md='8' className="d-flex align-items-center justify-content-center">
                            <Col sm="8" md='5' className={`${style.root_content_model_conatiner} d-flex justify-content-center pt-5`}>
                                model
                            </Col>
                    </Col>
                </Row>
           </Container>
        </>
    )
}

export default RootAuth;


// Dodaj outlet