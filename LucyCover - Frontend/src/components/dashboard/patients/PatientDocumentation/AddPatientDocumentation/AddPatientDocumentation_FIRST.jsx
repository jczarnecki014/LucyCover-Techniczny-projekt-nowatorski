import { useDispatch,useSelector } from "react-redux";
import { SetInput } from "../../../../../context/slices/AddFirstDocumentationForm";

import { MdKeyboardArrowRight } from "react-icons/md";

import OverlayModel from "../../../../utility/OverlayModel"

import style from './css/AddPatientDocumentation_FORMS.module.css'
import TextArea from "../../../../utility/TextArea"
import CheckFormIsValid from "../../../../../assets/Validation/CheckFormIsValid";

import PatientDetailsSection from "./FirstDocumentationSections/PatientDetailsSection";
import BabyDetailsSection from "./FirstDocumentationSections/BabyDetailsSection";
import PatientFamilyInterviewSection from "./FirstDocumentationSections/PatientFamilyInterviewSection";

const AddPatientDocumentation_FIRST = () => {

    const dispatch = useDispatch();
    const formInputs = useSelector(state => state.addFirstDocumentationForm.formInputs)

    const formIsValid = CheckFormIsValid(formInputs)

    const SetFormInputHandler = ({inputId,inputObject}) => {
        dispatch(SetInput({inputId,inputObject}))
    }

    return (
        <OverlayModel title="Dodaj nową dokumentacje (pierwsza)">
            <form className={style.Container}>
                <div className={style.LeftSide}>
                    <PatientDetailsSection SetFormInputHandler={SetFormInputHandler} />
                    <BabyDetailsSection SetFormInputHandler={SetFormInputHandler} formInputs={formInputs} />
                </div>
                <div className={style.RightSide}>
                    <TextArea controlId='documentationReason' label="Powód zgłoszenia" className={style.FullInput} onChange={SetFormInputHandler}/>
                    <PatientFamilyInterviewSection SetFormInputHandler={SetFormInputHandler} formInputs={formInputs} />
                    <section className={style.PatientFormButtonSection}>
                        <button disabled={!formIsValid}>Zapisz <MdKeyboardArrowRight /> </button>
                    </section>
                </div>
            </form>
        </OverlayModel>
    )
}

export default AddPatientDocumentation_FIRST