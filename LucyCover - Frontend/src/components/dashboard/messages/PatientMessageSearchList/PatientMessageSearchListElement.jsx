import style from '../css/Message.module.css'
import { AiFillMessage } from "react-icons/ai";

const PatientMessageSearchListElement = () => {
    return (
        <div className={style.PatientElement}>
            <h5>Barbara Kret</h5>
            <AiFillMessage size={20} color={"#3FA91A"}  />
        </div>
    )
}

export default PatientMessageSearchListElement;