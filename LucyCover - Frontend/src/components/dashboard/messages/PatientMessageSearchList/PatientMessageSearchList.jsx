import PatientMessageElement from "./PatientMessageSearchListElement"
import style from '../css/Message.module.css'

const PatientMessageSearchList = ({children}) => {
    return (
        <div className={style.PatientList}>
            <div className={style.SearchPatient}>
                <h5>Wyszukaj</h5>
                <input />
            </div>
            <div className={style.PatientElementsList}>
                {children}
            </div>
        </div>
    )
}
PatientMessageSearchList.Patient = PatientMessageElement;
export default PatientMessageSearchList