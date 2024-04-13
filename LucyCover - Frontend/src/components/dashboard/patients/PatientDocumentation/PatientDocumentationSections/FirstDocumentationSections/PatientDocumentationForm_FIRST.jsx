import { useDispatch,useSelector } from "react-redux";
import { SetInput,SetFormDefault } from "../../../../../../context/slices/AddFirstDocumentationForm";
import { useFormData } from "../../../../../../hooks/useFormData";

import { OverlayToggle } from "../../../../../../context/slices/OverlayModel_SLICE";

import { MdKeyboardArrowRight } from "react-icons/md";

import OverlayModel from "../../../../../utility/OverlayModel"

import style from '../css/PatientDocumentation_FORMS.module.css'
import CheckFormIsValid from "../../../../../../assets/Validation/CheckFormIsValid";

import PatientDetailsSection from "./PatientDetailsSection";
import BabyDetailsSection from "./BabyDetailsSection";
import PatientFamilyInterviewSection from "./PatientFamilyInterviewSection";



/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                    UWAGA                                                //
//          Inputy z FIRST różnią się troche od NEXT - DEFAULT W SELECT NIE SĄ SILNIE POWIĄZANE Z CONTEXT //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const PatientDocumentationForm_FIRST = ({toDisplayValues}) => {

    const dispatch = useDispatch();
    const formInputs = useSelector(state => state.addFirstDocumentationForm.formInputs)

    const getValue = useFormData();

    const formValue = toDisplayValues === undefined ? getValue(formInputs) : toDisplayValues;

    const formIsValid = CheckFormIsValid(formInputs)

    const SetFormInputHandler = ({inputId,inputObject}) => {
        dispatch(SetInput({inputId,inputObject}))
    }

    const OnCloseClearFormHandler = () => {
        dispatch(SetFormDefault())
        dispatch(OverlayToggle(false))
    }

    return (
        <OverlayModel title="Dodaj nową dokumentacje (pierwsza)" OnQuitButtonClick={OnCloseClearFormHandler}>
            <form className={style.Container}>
                <div className={style.LeftSide}>
                    <PatientDetailsSection SetFormInputHandler={SetFormInputHandler} formInputs={formValue} />
                    <BabyDetailsSection SetFormInputHandler={SetFormInputHandler} formInputs={formValue} />
                </div>
                <div className={style.RightSide}>
                    <PatientFamilyInterviewSection SetFormInputHandler={SetFormInputHandler} formInputs={formValue} />
                    <section className={style.PatientFormButtonSection}>
                        <button disabled={!formIsValid}>Zapisz <MdKeyboardArrowRight /> </button>
                    </section>
                </div>
            </form>
        </OverlayModel>
    )
}

export default PatientDocumentationForm_FIRST