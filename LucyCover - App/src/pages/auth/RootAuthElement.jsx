import { Outlet } from "react-router-dom";

import {Container,Row,Col} from 'react-bootstrap'


const RootAuthElement = () => {
    return (
        <>
            <Container fluid>
                <Row>
                   <Col>1</Col>
                   <Col>2</Col>
                </Row>
            </Container>
        </>
    )
}

export default RootAuthElement;


// Dodaj outlet