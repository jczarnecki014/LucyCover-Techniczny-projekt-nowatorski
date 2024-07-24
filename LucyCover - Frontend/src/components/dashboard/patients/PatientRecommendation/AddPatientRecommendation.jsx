import style from './css/AddPatientRecommendation.module.css'
import { useMutation } from '@tanstack/react-query'
import { useDispatch,useSelector } from 'react-redux'
import { SetInput } from '../../../../context/slices/AddPatientRecommendation'
import {useFormData} from '../../../../hooks/useFormData'
import OverlayModel from "../../../utility/OverlayModel"
import LabelInput from '../../../utility/LabelInput'
import TextArea from '../../../utility/TextArea'
import { MdKeyboardArrowRight } from "react-icons/md";
import CheckFormIsValid from '../../../../assets/Validation/CheckFormIsValid'
import { createNewRecommendation } from '../../../../api/https'
import { queryClient } from '../../../../api/https'
import Popup from '../../../utility/Popup'

const AddPatientRecommendation = ({patientId}) => {
    const {mutate,isPending,isError,isSuccess} = useMutation({
        mutationFn: createNewRecommendation,
        onSuccess: () => {
            console.log("sukces")
            queryClient.invalidateQueries(['recommendations'])
        },
        onError: (error) => {
            console.error(error)
        }
    })

    const todayDate = new Date().toISOString().split('T')[0];
    
    const dispatch = useDispatch()
    const getValue = useFormData();

    const formInputs = useSelector(state => state.addPatientRecommendation.formInputs)
    const formIsValid = CheckFormIsValid(formInputs)
    
    const SetFormInputHandler = ({inputId,inputObject}) => {
        dispatch(SetInput({inputId,inputObject}))
    }

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
            <Popup type="Error" title="Błąd" description="Coś poszło nie tak podczas dodawania zaleceń" />
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