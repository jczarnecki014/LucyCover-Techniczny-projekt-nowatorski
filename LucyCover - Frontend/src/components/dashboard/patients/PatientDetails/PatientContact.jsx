import style from './css/PatientDetails.module.css'

import LabelInput from '../../../utility/LabelInput'

const PatientContact = ({city,street,zipCode,province,phone,email}) => {
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