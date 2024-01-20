import { Row,Col } from "react-bootstrap"

import style from '../../css/Notyfication.module.css'

import {motion} from 'framer-motion'

import { GetNotyficationDetails } from "../../../../../assets/main/Notyfications";

import { RiDeleteBin2Line } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";

const NotyficationElement = ({notyficationDetails}) => {

    const notyfication = GetNotyficationDetails(notyficationDetails.type,notyficationDetails.description)

    return (
        <Col xs={12} className={`${style.NotyfiactionBlock} ${style[notyfication.backgroundType]} p-3`}>
            <h5>{notyfication.title}</h5>
            <hr />
            <p>{notyfication.description}</p>
            <Row >
                <Col xs={12} className='d-flex justify-content-end'>
                    <motion.span whileHover={{scale:1.5, color:"#CB60C8", cursor: 'pointer', transition:{duration:0.1}}} className="mx-1">
                        <RiDeleteBin2Line />
                    </motion.span>
                    <motion.span whileHover={{scale:1.5, color:"#3FA91A", cursor: 'pointer', transition:{duration:0.1}}} className="mx-1"> 
                        <FaRegEye />
                    </motion.span>
                </Col>
            </Row>
        </Col>
    )
}

export default NotyficationElement