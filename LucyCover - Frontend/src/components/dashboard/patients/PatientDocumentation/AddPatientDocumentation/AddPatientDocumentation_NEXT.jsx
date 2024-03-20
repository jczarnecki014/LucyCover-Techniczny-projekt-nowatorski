import { useSelector, useDispatch } from "react-redux"

import { SetInput } from "../../../../../context/slices/AddNextDocumentationForm"

import OverlayModel from "../../../../utility/OverlayModel"

import style from './css/AddPatientDocumentation_FORMS.module.css'

import CheckFormIsValid from "../../../../../assets/Validation/CheckFormIsValid"

import BabyFeedingSection from "../PatientDocumentationSections/NextDocumentationSections/BabyFeedingSection"
import BabyAdditionalFeeding from "../PatientDocumentationSections/NextDocumentationSections/BabyAdditionalFeeding"
import PatientBreastExaminationSection from "../PatientDocumentationSections/NextDocumentationSections/PatientBreastExaminationSection"
import BabyExcretionSection from "../PatientDocumentationSections/NextDocumentationSections/BabyExcretionSection"
import PatientMedicineSection from "../PatientDocumentationSections/NextDocumentationSections/PatientMedicineSection"
import PatientRecommendationSection from "../PatientDocumentationSections/NextDocumentationSections/PatientRecommendationSection"
import { MdKeyboardArrowRight } from "react-icons/md";

const AddPatientDocumentation_NEXT = () => {

    const dispatch = useDispatch();
    const formInputs = useSelector(state => state.addNextDocumentationForm.formInputs)
    const formIsValid = CheckFormIsValid(formInputs)

    const SetFormInputHandler = ({inputId,inputObject}) => {
        dispatch(SetInput({inputId,inputObject}))
    }

    console.log(formInputs)

    return (
        <OverlayModel title="Dodaj nową dokumentacje (domowa)">
            <form className={style.Container}>
                <div className={style.LeftSide}>
                    <BabyFeedingSection SetFormInputHandler={SetFormInputHandler} formInputs={formInputs} />
                    <BabyAdditionalFeeding SetFormInputHandler={SetFormInputHandler} formInputs={formInputs} /> 
                    <PatientBreastExaminationSection SetFormInputHandler={SetFormInputHandler} formInputs={formInputs} />

                </div>
                <div className={style.RightSide}>
                    <BabyExcretionSection SetFormInputHandler={SetFormInputHandler} formInputs={formInputs} />
                    <PatientMedicineSection SetFormInputHandler={SetFormInputHandler} formInputs={formInputs} />
                    <PatientRecommendationSection SetFormInputHandler={SetFormInputHandler} formInputs={formInputs} />
                    <section className={style.PatientFormButtonSection}>
                        <button disabled={!formIsValid}>Zapisz <MdKeyboardArrowRight /> </button>
                    </section>
                </div>
            </form>
        </OverlayModel>
    )
}

export default AddPatientDocumentation_NEXT