import { useSelector, useDispatch } from "react-redux"

import { SetInput } from "../../../../../context/slices/AddNextDocumentationForm"

import OverlayModel from "../../../../utility/OverlayModel"
import LabelInput from "../../../../utility/LabelInput"
import SelectInput from "../../../../utility/SelectInput"
import TextArea from "../../../../utility/TextArea"

import style from './css/AddPatientDocumentation_FORMS.module.css'
import BabyFeedingSection from "./NextDocumentationSections/BabyFeedingSection"
import BabyAdditionalFeeding from "./NextDocumentationSections/BabyAdditionalFeeding"
import PatientBreastExaminationSection from "./NextDocumentationSections/PatientBreastExaminationSection"
import BabyExcretionSection from "./NextDocumentationSections/BabyExcretionSection"
import PatientMedicineSection from "./NextDocumentationSections/PatientMedicineSection"
import PatientRecommendationSection from "./NextDocumentationSections/PatientRecommendationSection"

const AddPatientDocumentation_NEXT = () => {

    const dispatch = useDispatch();

    const SetFormInputHandler = ({inputId,inputObject}) => {
        dispatch(SetInput({inputId,inputObject}))
    }

    const form = useSelector(state => state.addNextDocumentationForm)
    console.log(form)

    return (
        <OverlayModel title="Dodaj nową dokumentacje (domowa)">
            <form className={style.Container}>
                <div className={style.LeftSide}>
                    <BabyFeedingSection SetFormInputHandler={SetFormInputHandler} />
                    <BabyAdditionalFeeding SetFormInputHandler={SetFormInputHandler} /> 
                    <PatientBreastExaminationSection SetFormInputHandler={SetFormInputHandler} />

                </div>
                <div className={style.RightSide}>
                    <BabyExcretionSection SetFormInputHandler={SetFormInputHandler} />
                    <PatientMedicineSection SetFormInputHandler={SetFormInputHandler} />
                    <PatientRecommendationSection SetFormInputHandler={SetFormInputHandler} />
                </div>
            </form>
        </OverlayModel>
    )
}

export default AddPatientDocumentation_NEXT