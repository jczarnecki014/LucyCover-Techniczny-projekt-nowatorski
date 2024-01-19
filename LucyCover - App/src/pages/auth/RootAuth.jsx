import { Outlet } from "react-router-dom";

import {Container,Row,Col,Image} from 'react-bootstrap'

import style from './css/RootAuth.module.css'

const RootAuth = () => {
    return (
           <Container className={style.root_container} fluid>
                <Row>
                    <Col  md='4' className={style.root_mosaic_side}></Col>
                    <Col  md='8' className="d-flex align-items-center justify-content-center">
                        <Col sm="10" md='5' className={`${style.root_content_model_conatiner}`}>
                            <Outlet />
                            {/* LoginPage component / RegisterPage component */}
                        </Col>
                    </Col>
                </Row>
           </Container>
    )
}

export default RootAuth;


// Dodaj outlet