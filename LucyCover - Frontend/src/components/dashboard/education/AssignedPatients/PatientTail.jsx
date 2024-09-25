import style from '../css/Education.module.css'
import { FaUser } from "react-icons/fa";

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