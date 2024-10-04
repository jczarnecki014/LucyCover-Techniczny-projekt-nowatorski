import style from '../css/Message.module.css'
import { AiFillMessage } from "react-icons/ai";

const PatientMessageSearchListElement = ({patient}) => {
    return (
        <div className={style.PatientElement}>
            <h5>{`${patient.firstName} ${patient.lastName}`}</h5>
            <AiFillMessage size={20} color={"#3FA91A"}  />
        </div>
    )
}

export default PatientMessageSearchListElement;