import { Fragment } from "react"

import style from '../../css/PatientAddingForm.module.css'

import { BiSolidHomeHeart } from "react-icons/bi";
import LabelInput from "../../../../utility/LabelInput";

import { CheckZipCodeIsValid } from "../../../../../assets/Validation/PersonalData";

const PatientFormPlaceSection = ({setPatientInput,FormSubmit,formIsValid,patientInputs}) => {

    const {province,city,address,zipCode} = patientInputs

    return (
        <Fragment>
            <div id={style.PlaceIcon} className={style.FormIcons}>
                <BiSolidHomeHeart size={70} />
                <h5>Miejsce zamieszkania</h5>
            </div>
            <div id={style.PlaceInputs} className={style.FormInputs}>
                <LabelInput className={style.Input} controlId="province" label="Powiat" required onInput={setPatientInput} value={province.value} />
                <LabelInput className={style.Input} controlId="city" label="Miejscowość" required onInput={setPatientInput} value={city.value} />
                <LabelInput className={style.Input} controlId="address" label="Adres" required onInput={setPatientInput} value={address.value} />
                <LabelInput className={style.Input} controlId="zipCode" label="Kod pocztowy" required onInput={setPatientInput} value={zipCode.value} validationFunction={CheckZipCodeIsValid} />
                <button id={style.DesktopVersion} className={style.SubmitButton} onClick={FormSubmit} disabled={!formIsValid}>Dodaj</button>
            </div>
        </Fragment>
    )
}

export default PatientFormPlaceSection