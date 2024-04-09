import { useSelector, useDispatch } from "react-redux"
import { useFormData } from "../../../../../../hooks/useFormData"

import { SetInput,SetFormDefault } from "../../../../../../context/slices/AddNextDocumentationForm"

import OverlayModel from "../../../../../utility/OverlayModel"
import { OverlayToggle } from "../../../../../../context/slices/OverlayModel_SLICE"

import style from '../css/PatientDocumentation_FORMS.module.css'

import CheckFormIsValid from "../../../../../../assets/Validation/CheckFormIsValid"

import BabyFeedingSection from "./BabyFeedingSection"
import BabyAdditionalFeeding from "./BabyAdditionalFeeding"
import PatientBreastExaminationSection from "./PatientBreastExaminationSection"
import BabyExcretionSection from "./BabyExcretionSection"
import PatientMedicineSection from "./PatientMedicineSection"
import PatientRecommendationSection from "./PatientRecommendationSection"
import { MdKeyboardArrowRight } from "react-icons/md";

const PatientDocumentationForm_NEXT = ({toDisplayValues}) => {

    const dispatch = useDispatch();
    const formInputs = useSelector(state => state.addNextDocumentationForm.formInputs)
    const formIsValid = CheckFormIsValid(formInputs)

    const getValue = useFormData();
    const formValue = toDisplayValues === undefined ? getValue(formInputs) : toDisplayValues;

    const SetFormInputHandler = ({inputId,inputObject}) => {
        dispatch(SetInput({inputId,inputObject}))
    }

    const OnCloseClearFormHandler = () => {
        dispatch(SetFormDefault())
        dispatch(OverlayToggle(false))
    }

    return (
        <OverlayModel title="Dodaj nową dokumentacje (domowa)" OnQuitButtonClick={OnCloseClearFormHandler}>
            <form className={style.Container}>
                <div className={style.LeftSide}>
                    <BabyFeedingSection SetFormInputHandler={SetFormInputHandler} formInputs={formValue} />
                    <BabyAdditionalFeeding SetFormInputHandler={SetFormInputHandler} formInputs={formValue} /> 
                    <PatientBreastExaminationSection SetFormInputHandler={SetFormInputHandler} formInputs={formValue} />

                </div>
                <div className={style.RightSide}>
                    <BabyExcretionSection SetFormInputHandler={SetFormInputHandler} formInputs={formValue} />
                    <PatientMedicineSection SetFormInputHandler={SetFormInputHandler} formInputs={formValue} />
                    <PatientRecommendationSection SetFormInputHandler={SetFormInputHandler} formInputs={formValue} />
                    <section className={style.PatientFormButtonSection}>
                        <button disabled={!formIsValid}>Zapisz <MdKeyboardArrowRight /> </button>
                    </section>
                </div>
            </form>
        </OverlayModel>
    )
}

export default PatientDocumentationForm_NEXT