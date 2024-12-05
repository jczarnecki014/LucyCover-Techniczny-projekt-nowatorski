//Components
import { FaUser } from "react-icons/fa";
import LabelInput from '@components/utility/LabelInput'
//Style
import style from './css/PatientDetails.module.css'

const PatientName = ({firstName,lastName}) => {
    return (
        <section id={style.PatientName} className={style.DetailBlock}>
            <div className={style.PatientIcon}>
                <FaUser size={70} />
            </div>
            <form className={style.PatientNameForm}>
                <LabelInput controlId="FirstName" label="Imię" readonly={true} value={firstName} boxShadow={true} />
                <LabelInput controlId="LastName" label="Nazwisko" readonly={true} value={lastName} boxShadow={true} />
            </form>
        </section>
    )
}
export default PatientName