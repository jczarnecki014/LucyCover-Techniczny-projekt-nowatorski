import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { SetInput,LoadDefaultData,SetFormDefault } from "../../../../../../context/slices/AddFirstDocumentationForm";
import { useFormData } from "../../../../../../hooks/useFormData";

import { OverlayToggle } from "../../../../../../context/slices/OverlayModel_SLICE";

import { MdKeyboardArrowRight } from "react-icons/md";

import OverlayModel from "../../../../../utility/OverlayModel"

import style from '../css/PatientDocumentation_FORMS.module.css'
import CheckFormIsValid from "../../../../../../assets/Validation/CheckFormIsValid";

import PatientDetailsSection from "./PatientDetailsSection";
import BabyDetailsSection from "./BabyDetailsSection";
import PatientFamilyInterviewSection from "./PatientFamilyInterviewSection";
import BaseInformation from "../BaseInformation";
import Popup from "../../../../../utility/Popup";




/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                    UWAGA                                                //
//          Inputy z FIRST różnią się troche od NEXT - DEFAULT W SELECT NIE SĄ SILNIE POWIĄZANE Z CONTEXT //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////

const PatientDocumentationForm_FIRST = ({toDisplayValues,onFormSubmit,isSuccess,childrenList,documentationId}) => {
    const [firstRun,setFirstRun] = useState(true)
    const dispatch = useDispatch();
    const formInputs = useSelector(state => state.addFirstDocumentationForm.formInputs)

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

    const SetFormInputHandler = ({inputId,inputObject}) => {
        dispatch(SetInput({inputId,inputObject}))
    }

    const OnCloseClearFormHandler = () => {
        dispatch(SetFormDefault())
        dispatch(OverlayToggle(false))
    }

    const FormSumbitHandler = (event) => {
        event.preventDefault();
        onFormSubmit(true,formValue,documentationId)
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

        {!isSuccess && (
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