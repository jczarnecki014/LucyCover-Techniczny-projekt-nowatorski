//TopBar
//MainMenu
//RightMenu

import {Row, Col, Container } from "react-bootstrap"

import TopBar from "./TopBar"
import RightSideMenu from "./RightSideMenu/RightSideMenu"
import MainMenu from "./MainMenu/MainMenu"
import Content from "./Content"

const Wrapper = ({children}) => {
    return ( 
        <Container fluid>
            <TopBar />
            <Row>
                <Col md={8} lg={10}>
                    <MainMenu />
                    <Content>
                        {children}
                    </Content>
                </Col>
                <RightSideMenu />
            </Row>
        </Container>
    )
}

export default Wrapper