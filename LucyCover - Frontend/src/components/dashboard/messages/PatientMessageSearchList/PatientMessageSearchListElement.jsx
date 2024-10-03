import style from '../css/Message.module.css'
import { AiFillMessage } from "react-icons/ai";
import {motion} from 'framer-motion'

const PatientMessageSearchListElement = ({patient,onPatientClick,activePatientEmail}) => {
    const isActive = patient.email == activePatientEmail

    return (
        <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0,opacity:0}} transition={{duration: 0.3, ease: "easeIn"}} id={isActive && style.IsActive} className={style.PatientElement} onClick={()=>onPatientClick(patient.email)}>
            <h5>{`${patient.firstName} ${patient.lastName}`}</h5>
            <AiFillMessage size={20} color={"#3FA91A"}  />
        </motion.div>
    )
}

export default PatientMessageSearchListElement;