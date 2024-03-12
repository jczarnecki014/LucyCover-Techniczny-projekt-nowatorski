import { useSelector, useDispatch } from "react-redux"

import { SetInput } from "../../../../../context/slices/AddNextDocumentationForm"

import OverlayModel from "../../../../utility/OverlayModel"

import style from './css/AddPatientDocumentation_FORMS.module.css'

import BabyFeedingSection from "./NextDocumentationSections/BabyFeedingSection"
import BabyAdditionalFeeding from "./NextDocumentationSections/BabyAdditionalFeeding"
import PatientBreastExaminationSection from "./NextDocumentationSections/PatientBreastExaminationSection"
import BabyExcretionSection from "./NextDocumentationSections/BabyExcretionSection"
import PatientMedicineSection from "./NextDocumentationSections/PatientMedicineSection"
import PatientRecommendationSection from "./NextDocumentationSections/PatientRecommendationSection"
import { MdKeyboardArrowRight } from "react-icons/md";

const AddPatientDocumentation_NEXT = () => {

    const dispatch = useDispatch();
    const formInputs = useSelector(state => state.addNextDocumentationForm.formInputs)

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
                        <button >Zapisz <MdKeyboardArrowRight /> </button>
                    </section>
                </div>
            </form>
        </OverlayModel>
    )
}

export default AddPatientDocumentation_NEXT