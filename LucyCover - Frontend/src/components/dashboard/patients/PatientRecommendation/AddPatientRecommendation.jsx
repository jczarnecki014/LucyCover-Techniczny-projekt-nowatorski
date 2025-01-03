//Components
import OverlayModel from "@components/utility/OverlayModel"
import LabelInput from '@components/utility/LabelInput'
import TextArea from '@components/utility/TextArea'
import { MdKeyboardArrowRight } from "react-icons/md";
import Popup from '@components/utility/Popup'
//Style
import style from './css/AddPatientRecommendation.module.css'
//Hooks
import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import {useFormData} from '@hooks/useFormData'
import { useCallback } from "react";
//Slice
import { SetInput } from '@context/slices/AddPatientRecommendation'
//Api
import { CreateNewRecommendation } from '@api/https'
import { queryClient } from '@api/https'
//Assets
import CheckFormIsValid from '@assets/validation/CheckFormIsValid'
import useInputsSilce from "@hooks/useInputsSlice";


/**
 * AddPatientRecommendation - component to display patient recommendations form.
 * 
 * Functionality:
 * 
 *  [1] - Displaing recommendation form
 * 
 *  [2] - Component take details from user
 */

const AddPatientRecommendation = ({patientId}) => {
    const {mutate,isError,error,isSuccess} = useMutation({
        mutationFn: CreateNewRecommendation,
        onSuccess: () => {
            queryClient.invalidateQueries(['recommendations'])
        }
    })

    const todayDate = new Date().toISOString().split('T')[0];
    
    const getValue = useFormData();
    const SetFormInputHandler = useCallback(useInputsSilce(SetInput),[SetInput])

    const formInputs = useSelector(state => state.addPatientRecommendation.formInputs)
    const formIsValid = CheckFormIsValid(formInputs)

    const FormSubmitHandler = (event) => {
        event.preventDefault();
        const formValue = getValue(formInputs);
        mutate({
            recommendationDetails:formValue,
            patientId:patientId
        })
    }

    return (
        <>
        {isSuccess && (
            <Popup type="success" title="Udało się !" description="Dodawanie rokomendacji zakończyło się pomyślnie." />
        )}
        {isError && (
            <Popup type="Error" title="Błąd" description={error.message} />
        )}
        {!isSuccess && !isError && (
            <OverlayModel title="Dodaj nowe zalecenie">
                <form onSubmit={FormSubmitHandler}>
                    <LabelInput controlId='title' label="Tytuł zalecenia" onInput={SetFormInputHandler} required />
                    <LabelInput controlId='date' label="Data zalecenia" onInput={SetFormInputHandler} inputType="date" value={todayDate} />
                    <TextArea controlId='text' label="Opis zalecenia" onChange={SetFormInputHandler} rows={10} required />
                    <section className={style.PatientFormButtonSection}>
                        <button disabled={!formIsValid}>Zapisz <MdKeyboardArrowRight /> </button>
                    </section>
                </form>
            </OverlayModel>
        )}
        </>
    )
}

export default AddPatientRecommendation