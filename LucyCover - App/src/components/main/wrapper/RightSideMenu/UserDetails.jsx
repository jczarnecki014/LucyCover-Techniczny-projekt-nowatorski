import {Row,Col,Image} from 'react-bootstrap'

import avatar from '../../../../assets/images/avatar.png'

const UserDetails = ({userName,userRole}) => {
    return (
        <Row className='d-flex justify-content-center pt-5'>
            <Col xs={6} md={9}>
                <Image src={avatar} roundedCircle fluid/>
            </Col>
            <Col xs={12} md={12}>
                <Col className='d-flex justify-content-center mt-4 text-light'>
                    <h5>{userName}</h5>
                </Col>
                <Col className='d-flex justify-content-center text-light'>
                    <small>{userRole}</small>
                </Col>
            </Col>
        </Row>  
    )
}

export default UserDetails