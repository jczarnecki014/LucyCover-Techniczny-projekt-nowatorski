import { Fragment } from "react"

import style from '../css/PatientAddingForm.module.css'

import { FaUser } from "react-icons/fa";
import LabelInput from "../../../../utility/LabelInput";

import { CheckEmailIsValid,CheckPhoneIsValid } from "../../../../../assets/Validation/PersonalData";


const currentDate = new Date();
const tenYearsAgo = currentDate.getFullYear() - 10;

const datePickerMax = new Date(tenYearsAgo,currentDate.getMonth(), currentDate.getDate()).toLocaleDateString('fr-ca')

const PatientFormContactSection = ({setPatientInput,patientInputs}) => {
    const {firstName,lastName,birthDate,birthPlace,phoneNumber,email} = patientInputs
    return (
        <Fragment>
            <div id={style.ContactIcon} className={style.FormIcons}>
                <FaUser size={70} />
                <h5>Dane pacjenta</h5>
            </div>
            <div id={style.ContactInputs} className={style.FormInputs}>
                <LabelInput className={style.Input} controlId="firstName" label="Imię" required onInput={setPatientInput} value={firstName} />
                <LabelInput className={style.Input} controlId="lastName" label="Nazwisko" required onInput={setPatientInput} value={lastName} />
                <LabelInput className={style.Input} controlId="birthDate" label="Data urodzenia" inputType="date" max={datePickerMax} required  onInput={setPatientInput} value={birthDate} />
                <LabelInput className={style.Input} controlId="birthPlace" label="Miejsce urodzenia" required onInput={setPatientInput} value={birthPlace} />
                <LabelInput className={style.Input} controlId="phoneNumber" label="Telefon" type="tel" required onInput={setPatientInput} value={phoneNumber} validationFunction={CheckPhoneIsValid} />
                <LabelInput className={style.Input} controlId="email" label="Email" type="email" required onInput={setPatientInput} value={email} validationFunction={CheckEmailIsValid} />
            </div>
        </Fragment>
    )
}

export default PatientFormContactSection