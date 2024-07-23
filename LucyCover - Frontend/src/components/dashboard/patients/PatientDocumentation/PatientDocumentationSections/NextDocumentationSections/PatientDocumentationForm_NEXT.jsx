import { useSelector, useDispatch } from "react-redux"
import { useFormData } from "../../../../../../hooks/useFormData"
import { useState,useEffect } from "react"
import { SetInput,SetFormDefault } from "../../../../../../context/slices/AddNextDocumentationForm"
import { LoadDefaultData } from "../../../../../../context/slices/AddNextDocumentationForm"
import OverlayModel from "../../../../../utility/OverlayModel"
import { OverlayToggle } from "../../../../../../context/slices/OverlayModel_SLICE"
import Popup from "../../../../../utility/Popup"
import style from '../css/PatientDocumentation_FORMS.module.css'
import CheckFormIsValid from "../../../../../../assets/Validation/CheckFormIsValid"
import BabyFeedingSection from "./BabyFeedingSection"
import BabyAdditionalFeeding from "./BabyAdditionalFeeding"
import PatientBreastExaminationSection from "./PatientBreastExaminationSection"
import BabyExcretionSection from "./BabyExcretionSection"
import PatientMedicineSection from "./PatientMedicineSection"
import PatientRecommendationSection from "./PatientRecommendationSection"
import { MdKeyboardArrowRight } from "react-icons/md";
import BaseInformation from "../BaseInformation"

const PatientDocumentationForm_NEXT = ({toDisplayValues,childrenList,onFormSubmit,documentationId,isSuccess,isError}) => {

    const dispatch = useDispatch();
    const [firstRun,setFirstRun] = useState(true)

    useEffect(()=>{
        if(firstRun && toDisplayValues != undefined){
            dispatch(LoadDefaultData(toDisplayValues))
        }
        setFirstRun(false)
    },[toDisplayValues])

    useEffect(()=>{
        if((isSuccess && toDisplayValues)){
            setTimeout(()=>{
                location.reload()
            },2000)
        }
    },[isSuccess])

    const formInputs = useSelector(state => state.addNextDocumentationForm.formInputs)
    const formIsValid = CheckFormIsValid(formInputs)

    const getValue = useFormData();
    const formValue = getValue(formInputs);

    const SetFormInputHandler = ({inputId,inputObject}) => {
        dispatch(SetInput({inputId,inputObject}))
    }

    const OnCloseClearFormHandler = () => {
        dispatch(SetFormDefault())
        dispatch(OverlayToggle(false))
    }

    const FormSumbitHandler = (event) => {
        event.preventDefault();
        onFormSubmit(false,formValue,documentationId)
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
            <Popup type="error" title="Błąd !" description="Coś poszło nie tak podczas zapisu dokumentacji w systemie." additionalInfo="Zgłoś problem administratorowi systemu." />
        )}
        {!isSuccess && !isError && (
            <OverlayModel title="Dodaj nową dokumentacje (domowa)" OnQuitButtonClick={OnCloseClearFormHandler}>
                <form className={style.Container} onSubmit={FormSumbitHandler}>
                    <div className={style.LeftSide}>
                        <BabyFeedingSection SetFormInputHandler={SetFormInputHandler} formInputs={formValue} />
                        <BabyAdditionalFeeding SetFormInputHandler={SetFormInputHandler} formInputs={formValue} /> 
                        <PatientBreastExaminationSection SetFormInputHandler={SetFormInputHandler} formInputs={formValue} />

                    </div>
                    <div className={style.RightSide}>
                        <BabyExcretionSection SetFormInputHandler={SetFormInputHandler} formInputs={formValue} />
                        <PatientMedicineSection SetFormInputHandler={SetFormInputHandler} formInputs={formValue} />
                        <PatientRecommendationSection SetFormInputHandler={SetFormInputHandler} formInputs={formValue} />
                        <BaseInformation SetFormInputHandler={SetFormInputHandler} formInputs={formValue} childrenList={childrenList} /> 
                        <section className={style.PatientFormButtonSection}>
                            <button disabled={!formIsValid}>Zapisz <MdKeyboardArrowRight /> </button>
                        </section>
                    </div>
                </form>
            </OverlayModel>
        )}
        </>
    )
}

export default PatientDocumentationForm_NEXT