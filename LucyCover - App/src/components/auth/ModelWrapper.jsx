
import {Container,Row,Col} from 'react-bootstrap'

import style from './css/BackgroundWrapper.module.css'

const ModelWrapper = (props) => {
    return (
           <Container className={style.root_container} fluid>
                <Row>
                    <Col  md='4' className={style.root_mosaic_side}></Col>
                    <Col  md='8' className="d-flex align-items-center justify-content-center">
                        <Col sm="10" md='5' className={`${style.root_content_model_conatiner}`}>
                            {props.children}
                        </Col>
                    </Col>
                </Row>
           </Container>
    )
}

export default ModelWrapper;


// Dodaj outlet