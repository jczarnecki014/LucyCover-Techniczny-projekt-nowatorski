import { useDispatch,useSelector } from "react-redux";
import { SetInput } from "../../../../../context/slices/AddFirstDocumentationForm";

import { MdKeyboardArrowRight } from "react-icons/md";

import OverlayModel from "../../../../utility/OverlayModel"

import style from './css/AddPatientDocumentation_FORMS.module.css'
import CheckFormIsValid from "../../../../../assets/Validation/CheckFormIsValid";

import PatientDetailsSection from "../PatientDocumentationSections/FirstDocumentationSections/PatientDetailsSection";
import BabyDetailsSection from "../PatientDocumentationSections/FirstDocumentationSections/BabyDetailsSection";
import PatientFamilyInterviewSection from "../PatientDocumentationSections/FirstDocumentationSections/PatientFamilyInterviewSection";



/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                    UWAGA                                                //
//          Inputy z FIRST różnią się troche od NEXT - DEFAULT W SELECT NIE SĄ SILNIE POWIĄZANE Z CONTEXT //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////

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