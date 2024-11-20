//Componets
import { FaUser } from "react-icons/fa";
//Style
import style from '../css/Education.module.css'

/**
 * PatientTail - Component to displaying assigned patients to material
 * 
 * Education <- AssignedPatients <- Parent component
 * 
 * Functionality: 
 * 
 *  [1] - Displaying assigned patient tail
 * 
 */

const PatientTail = ({firstName,lastName,city,address}) => {
    return (
        <div className={style.patient}>
            <span className={style.patientIcon}>
                <FaUser size={50} color="#fff" />
            </span>
            <span className={style.patientInfo}>
                <h6>{firstName} {lastName}</h6>
                <small>{city}</small>
                <small>ul. {address}</small>
            </span>
        </div>
    )
}

export default PatientTail