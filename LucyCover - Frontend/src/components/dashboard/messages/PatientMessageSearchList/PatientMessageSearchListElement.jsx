//Components
import { AiFillMessage } from "react-icons/ai";
import {motion} from 'framer-motion'
//Style
import style from '../css/Message.module.css'


/**
 * PatientMessageSearchListElement - component to display details of patient
 * 
 *  Child element:
 * 
 *  PatientMessageSearchList <- PatientMessageSearchListElement 
 * 
 * Functionality: 
 * 
 *  [1] - Displaying details of patient
 * 
 *  [2] - Searching specific patient by its details
 * Params:
 * 
 *  @param {object} patient - object with patient details
 * 
 *  @param {function} OnPatientClick - Function invoke when user click on the patient element
 * 
 * @param {string} activePatientEmail - string with active patient email
 * 
 */

const PatientMessageSearchListElement = ({patient,OnPatientClick,activePatientEmail}) => {
    const isActive = patient.email == activePatientEmail

    return (
        <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0,opacity:0}} transition={{duration: 0.3, ease: "easeIn"}} id={isActive && style.IsActive} className={style.PatientElement} onClick={()=>OnPatientClick(patient.email)}>
            <h5>{`${patient.firstName} ${patient.lastName}`}</h5>
            <AiFillMessage size={20} color={"#3FA91A"}  />
        </motion.div>
    )
}

export default PatientMessageSearchListElement;