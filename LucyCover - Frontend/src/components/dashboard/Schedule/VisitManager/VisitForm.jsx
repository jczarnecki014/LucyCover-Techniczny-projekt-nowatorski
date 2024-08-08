import style from './css/AddNewVisit.module.css'
import { useMutation } from '@tanstack/react-query';
import { queryClient, upsertVisit } from '../../../../api/https';
import {useDispatch,useSelector} from 'react-redux';
import {SetInput} from '../../../../context/slices/AddNewVisitToScheduleForm';
import {useFormData} from '../../../../hooks/useFormData'
import CheckFormIsValid from '../../../../assets/Validation/CheckFormIsValid'
import { ResetActivePatients } from '../../../../context/slices/PatientSearch_SLICE';
import { SetFormDefault } from '../../../../context/slices/AddNewVisitToScheduleForm';
import { OverlayToggle } from '../../../../context/slices/OverlayModel_SLICE';
import { CheckPhoneIsValid } from '../../../../assets/Validation/PersonalData';
import { CheckZipCodeIsValid } from '../../../../assets/Validation/PersonalData';
import { SlUserFemale } from "react-icons/sl";
import OverlayModel from '../../../utility/OverlayModel'
import LabelInput from '../../../utility/LabelInput'
import TextArea from '../../../utility/TextArea'
import VisitStatusButtonSection from './VisitStatusButtonSection';

const VisitForm = ({SetFormDisplayHandler,activePatient,activeChildren,visitID}) => {

    const {mutate} = useMutation({
        mutationFn: upsertVisit,
        onSuccess: () => {
            queryClient.invalidateQueries(['schedule'])
        },
        onError: (error) => {
            SetFormDisplayHandler("error");
        }
    })


    const dispatch = useDispatch();
    const formInputs = useSelector(state => state.addNewVisitToScheduleForm.formInputs)
    const getValue = useFormData(); 

    const generalVisitDetails = getValue(formInputs)

    const {firstName,lastName,birthDate,phoneNumber} = activePatient
    const {childFirstName,childLastName,childBirthDate} = activeChildren;
    const {city,street,streetNumber,zipCode,date,clock,description,status} = generalVisitDetails

    const formIsValid = CheckFormIsValid(formInputs) && activePatient.id && activeChildren.id

    const SetFormInputHandler = ({inputId,inputObject}) => {
        dispatch(SetInput({inputId,inputObject}))
    }
    const FormSubmitHandler = (event) => {
        const visitDetails = {
            id: visitID,
            childId: activeChildren.id,
            ...generalVisitDetails
        }
        mutate({visitDetails,patientId:activePatient.id})
        SetFormDisplayHandler('visitNotyfication')
    }

    const FormQuitHandler = () => {
        dispatch(ResetActivePatients())
        dispatch(SetFormDefault())
        dispatch(OverlayToggle(false))
    }


    return (
        <OverlayModel 
            title="Zaplanuj wizytę" 
            funcButton={{btnLabel:'Wybierz pacjenta',func:()=>SetFormDisplayHandler('patientsListMode')}}
            OnQuitButtonClick={FormQuitHandler}
            >
                <form className={style.Container}>
                    <div className={style.Section}>
                        <div className={style.Icon}>
                            <SlUserFemale size={120} color={'#fff'} />
                        </div>
                        <div className={style.Inputs}>
                            <LabelInput 
                                className={style.Input} 
                                label="Imię" 
                                value={firstName}
                                disabled
                                required />

                            <LabelInput 
                                className={style.Input} 
                                label="Nazwisko"
                                value={lastName}
                                disabled
                                required />

                            <LabelInput 
                                className={style.Input} 
                                label="Data urodzenia" 
                                inputType="date" 
                                value={birthDate} 
                                disabled
                                required />

                            <LabelInput 
                                className={style.Input} 
                                label="Telefon" 
                                validationFunction={CheckPhoneIsValid} 
                                value={phoneNumber}
                                disabled
                                required />
                        </div>
                    </div>
                    <div id={style.ChildrenSection} className={style.Section}>
                        <div className={style.Icon}>
                        </div>
                        <div className={style.Inputs}>
                            <LabelInput 
                                className={style.Input} 
                                label="Imię" 
                                value={childFirstName} 
                                disabled
                                required />

                            <LabelInput 
                                className={style.Input} 
                                label="Nazwisko" 
                                value={childLastName} 
                                disabled
                                required />

                            <LabelInput 
                                className={style.Input} 
                                label="data urodzenia" 
                                inputType="date" 
                                value={childBirthDate} 
                                disabled
                                required />

                            <button className={style.Input} onClick={()=>{SetFormDisplayHandler('childrenListMode')}}>
                                Wybierz dziecko
                            </button>
                        </div>
                    </div>
                    <div id={style.AddressSection}>
                        <div className={style.AddressDetails}>
                            <div className={style.Inputs}>
                                <LabelInput 
                                    controlId="city" 
                                    className={style.Input} 
                                    label="Miejscowość" 
                                    onInput={SetFormInputHandler} 
                                    required 
                                    value={city} />

                                <LabelInput 
                                    controlId="street" 
                                    className={style.Input} 
                                    label="Ulica" 
                                    onInput={SetFormInputHandler} 
                                    required 
                                    value={street} />

                                <LabelInput 
                                    controlId="streetNumber" 
                                    className={style.Input_w50} 
                                    label="Nr domu" 
                                    onInput={SetFormInputHandler} 
                                    required 
                                    value={streetNumber} />

                                <LabelInput 
                                    controlId="zipCode"
                                    className={style.Input_w50} 
                                    label="kod pocztowy"
                                    validationFunction={CheckZipCodeIsValid}
                                    onInput={SetFormInputHandler} 
                                    required 
                                    value={zipCode} />
                            </div>
                        </div>
                        <div className={style.VisitDetails}>
                            <div className={style.Inputs}>
                                <LabelInput 
                                    controlId="date"
                                    className={style.Input_w50}
                                    label="Data"
                                    inputType='date'
                                    onInput={SetFormInputHandler} 
                                    required 
                                    value={date} />

                                <LabelInput 
                                    controlId="clock" 
                                    className={style.Input_w50} 
                                    label="Godzina" 
                                    inputType='time'
                                    onInput={SetFormInputHandler} 
                                    required 
                                    value={clock} />

                                <TextArea 
                                    controlId="description" 
                                    className={style.TextArea} 
                                    label="Notatka" 
                                    rows={5} 
                                    onChange={SetFormInputHandler} 
                                    required 
                                    defaultValue={description} />
                            </div>
                        </div>
                    </div>
                    <div className={style.ButtonSection}>
                        {
                            visitID && 
                                <VisitStatusButtonSection 
                                visitStatus={status} 
                                visitId = {visitID}
                                formIsValid={formIsValid}
                                SetFormDisplayHandler={SetFormDisplayHandler}
                        />
                        }
                        <button id={style.ActionButton} disabled={!formIsValid} onClick={FormSubmitHandler}>
                        {
                            visitID ? "Edytuj wizytę" : "Zaplanuj wizytę" 
                        }
                        </button>
                    </div>
                </form>
        </OverlayModel>
    )
}

export default VisitForm