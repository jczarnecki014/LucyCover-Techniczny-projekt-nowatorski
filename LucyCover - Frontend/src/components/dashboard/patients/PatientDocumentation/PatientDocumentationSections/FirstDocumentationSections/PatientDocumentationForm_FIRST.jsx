//Components
import PatientDetailsSection from "./PatientDetailsSection";
import BabyDetailsSection from "./BabyDetailsSection";
import PatientFamilyInterviewSection from "./PatientFamilyInterviewSection";
import BaseInformation from "../BaseInformation";
import Popup from "../../../../../utility/Popup";
import OverlayModel from "../../../../../utility/OverlayModel"
import { MdKeyboardArrowRight } from "react-icons/md";
//Style
import style from '../css/PatientDocumentation_FORMS.module.css'
//Hooks
import useFetchDocumentation from "../../../../../../hooks/useFetchDocumentation";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useFormData } from "../../../../../../hooks/useFormData";
//Slice
import { OverlayToggle } from "../../../../../../context/slices/OverlayModel_SLICE";
import { SetInput,LoadDefaultData,SetFormDefault } from "../../../../../../context/slices/AddFirstDocumentationForm";
//Assets
import CheckFormIsValid from "../../../../../../assets/Validation/CheckFormIsValid";
import useInputsSilce from "../../../../../../hooks/useInputsSlice";



/**
 * PatientDocumentationForm_FIRST - component to merge and form every section of first documentation and display it in correct order
 * 
 * Functionality:
 * 
 *  Displaying all first documentation sections component in order
 * 
 *  Form management
 * 
 *  Fetching documentation to backend
 */

const PatientDocumentationForm_FIRST = ({toDisplayValues,patientId,childrenList,documentationId}) => {
    const [firstRun,setFirstRun] = useState(true)
    const {fetchDocumentation,isSuccess,isError,error} = useFetchDocumentation(patientId);
    const formInputs = useSelector(state => state.addFirstDocumentationForm.formInputs)
    const SetFormInputHandler = useInputsSilce(SetInput);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(firstRun && toDisplayValues != undefined){
            dispatch(LoadDefaultData(toDisplayValues))
        }
        setFirstRun(false)
    },[toDisplayValues])

    useEffect(()=>{
        if(isSuccess && toDisplayValues){
            setTimeout(()=>{
                location.reload()
            },2000)
        }
    },[isSuccess])

    const getValue = useFormData();
    const formValue = getValue(formInputs);
    const formIsValid = CheckFormIsValid(formInputs)

    const OnCloseClearFormHandler = () => {
        dispatch(SetFormDefault())
        dispatch(OverlayToggle(false))
    }

    const FormSumbitHandler = (event) => {
        event.preventDefault();
        fetchDocumentation(true,formValue,documentationId)
        dispatch(SetFormDefault())
    }

    return (
        <>
        {isSuccess && (
            <Popup type="success" title="Sukces !" description="Pomyślnie utworzono nową dokumentację dla twojego pacjenta" />
            )
        }

        {isSuccess && toDisplayValues && (
            <Popup type="success" title="Sukces !" description="Operacja zakończyła się pomyślnie" additionalInfo="Zaczekaj, trwa aktualizacja" />
            )
        }

        {isError && (
            <Popup type="error" title="Błąd !" description={error.message} additionalInfo="Spróbuj ponownie później lub zgłoś problem." />
            )
        }

        {(!isSuccess && !isError) && (
            <OverlayModel title="Dodaj nową dokumentacje (pierwsza)" OnQuitButtonClick={OnCloseClearFormHandler}>
                <form className={style.Container} onSubmit={FormSumbitHandler}>
                    <div className={style.LeftSide}>
                        <PatientDetailsSection SetFormInputHandler={SetFormInputHandler} formInputs={formValue} />
                        <BabyDetailsSection SetFormInputHandler={SetFormInputHandler} formInputs={formValue} />
                    </div>
                    <div className={style.RightSide}>
                        <PatientFamilyInterviewSection SetFormInputHandler={SetFormInputHandler} formInputs={formValue} />
                        <BaseInformation SetFormInputHandler={SetFormInputHandler} formInputs={formValue} childrenList={childrenList} />
                        <section className={style.PatientFormButtonSection}>
                            <button disabled={!formIsValid}>Zapisz <MdKeyboardArrowRight /> </button>
                        </section>
                    </div>
                </form>
            </OverlayModel> 
            )
        }
        </>
    )
}

export default PatientDocumentationForm_FIRST