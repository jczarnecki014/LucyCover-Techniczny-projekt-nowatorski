import style from '../../css/RightSideMenu.module.css'

import {Row,Col} from 'react-bootstrap'

import NotyficationElement from './NotyficationElement'

const Notyfications = ({notyficationList}) => {
    return (
        <Row className='d-flex justify-content-center pt-5'>
            <Col xs={11} className={style.NotyficationsList}>
                {notyficationList.map((notyficationDetails) => {
                    return <NotyficationElement notyficationDetails={notyficationDetails} />
                })}
            </Col>
        </Row>
    )
}

export default Notyfications