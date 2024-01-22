import style from '../css/PatientsWrapper.module.css'

import { FaUser } from "react-icons/fa";
import LabelInput from '../../../utility/LabelInput'

const PatientContact = ({city,street,zipCode,province,phone,email,firstName,lastName}) => {
    return (
        <div id={style.PatientContact} className={style.DetailBlock}>
            <h5>Dane Kontaktowe</h5>
            <form className={style.PatientContactFrom}>
                <LabelInput className={style.FormElement} label="Miejscowość" controlId="City" readonly={true} value={city} boxShadow={true} />

                <LabelInput className={style.FormElement} label="Ulica" controlId="Street" readonly={true} value={street} boxShadow={true} />

                <LabelInput id={style.ZipCode} className={style.FormElement} label="Kod pocztowy" controlId="ZipCode" readonly={true} value={zipCode} boxShadow={true} />

                <LabelInput id={style.Province} className={style.FormElement} label="Województwo" controlId="Province" readonly={true} value={province} boxShadow={true} />

                <LabelInput className={style.FormElement} label="Telefon" controlId="Phone" readonly={true} value={phone} boxShadow={true} />

                <LabelInput className={style.FormElement} label="Email" controlId="Email" readonly={true} value={email} boxShadow={true} />
            </form>
        </div>
    )
}
export default PatientContact