//Components
import { Fragment } from "react"
import { BiSolidHomeHeart } from "react-icons/bi";
import LabelInput from "@components/utility/LabelInput";
//Style
import style from '../css/PatientAddingForm.module.css'
//Assets
import { CheckZipCodeIsValid } from "@assets/validation/PersonalData";

/**
 * PatientFormPlaceSection - component to display patient address details inputs
 * 
 *  Parrent component : <PatientForm />
 */

const PatientFormPlaceSection = ({setPatientInput,formIsValid,patientInputs,inEditMode,isPending}) => {
    const {province,city,address,zipCode} = patientInputs

    return (
        <Fragment>
            <div id={style.PlaceIcon} className={style.FormIcons}>
                <BiSolidHomeHeart size={70} />
                <h5>Miejsce zamieszkania</h5>
            </div>
            <div id={style.PlaceInputs} className={style.FormInputs}>
                <LabelInput className={style.Input} controlId="province" label="Powiat" required onInput={setPatientInput} value={province} />
                <LabelInput className={style.Input} controlId="city" label="Miejscowość" required onInput={setPatientInput} value={city} />
                <LabelInput className={style.Input} controlId="address" label="Adres" required onInput={setPatientInput} value={address} />
                <LabelInput className={style.Input} controlId="zipCode" label="Kod pocztowy" required onInput={setPatientInput} value={zipCode} validationFunction={CheckZipCodeIsValid} />
                <button id={style.DesktopVersion} className={style.SubmitButton} disabled={!formIsValid}>
                    {isPending && 'Zapisywanie' }
                    {(!isPending && !inEditMode) && "Dodaj" }
                    {(!isPending && inEditMode) && "Edytuj" }
                </button>
            </div>
        </Fragment>
    )
}

export default PatientFormPlaceSection