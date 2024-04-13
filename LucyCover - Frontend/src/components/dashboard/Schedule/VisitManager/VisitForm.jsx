import style from './css/AddNewVisit.module.css'

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

const VisitForm = ({SetFormDisplayHandler,activePatient,activeChildren,visitToEdit}) => {
    const dispatch = useDispatch();
    const formTest = useSelector(state => state.addNewVisitToScheduleForm.formInputs)
    const getValue = useFormData(); 

    const generalVisitDetails = visitToEdit ? visitToEdit.details : getValue(formTest)
    const visitState = visitToEdit && visitToEdit.visit.visitState;

    const {firstName,lastName,birthDate,phoneNumber} = activePatient
    const {childFirstName,childLastName,childBirthDate} = activeChildren;
    const {city,street,streetNumber,zipCode,visitDate,visitClock,visitNote} = generalVisitDetails

    const formIsValid = CheckFormIsValid(formTest)
    
    const SetFormInputHandler = ({inputId,inputObject}) => {
        dispatch(SetInput({inputId,inputObject}))
    }

    const FormSubmitHandler = (event) => {
        event.preventDefault();
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
                <form className={style.Container} onSubmit={FormSubmitHandler}>
                    <div className={style.Section}>
                        <div className={style.Icon}>
                            <SlUserFemale size={120} color={'#fff'} />
                        </div>
                        <div className={style.Inputs}>
                            <LabelInput 
                                controlId="firstName" 
                                className={style.Input} 
                                label="Imię" 
                                onInput={SetFormInputHandler} 
                                value={firstName}
                                required />

                            <LabelInput 
                                controlId="lastName"
                                className={style.Input} 
                                label="Nazwisko"
                                onInput={SetFormInputHandler} 
                                value={lastName}
                                required />

                            <LabelInput 
                                controlId="birthDate" 
                                className={style.Input} 
                                label="Data urodzenia" 
                                inputType="date" 
                                onInput={SetFormInputHandler}  
                                value={birthDate} 
                                required />

                            <LabelInput 
                                controlId="phoneNumber" 
                                className={style.Input} 
                                label="Telefon" 
                                onInput={SetFormInputHandler}
                                validationFunction={CheckPhoneIsValid} 
                                value={phoneNumber} 
                                required />
                        </div>
                    </div>
                    <div id={style.ChildrenSection} className={style.Section}>
                        <div className={style.Icon}>
                        </div>
                        <div className={style.Inputs}>
                            <LabelInput 
                                controlId="childFirstName" 
                                className={style.Input} 
                                label="Imię" 
                                onInput={SetFormInputHandler} 
                                value={childFirstName} 
                                required />

                            <LabelInput 
                                controlId="childLastName" 
                                className={style.Input} 
                                label="Nazwisko" 
                                onInput={SetFormInputHandler}
                                value={childLastName} 
                                required />

                            <LabelInput 
                                controlId="childBirthDate" 
                                className={style.Input} 
                                label="data urodzenia" 
                                inputType="date" 
                                onInput={SetFormInputHandler} 
                                value={childBirthDate} 
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
                                    controlId="patientCity" 
                                    className={style.Input} 
                                    label="Miejscowość" 
                                    onInput={SetFormInputHandler} 
                                    required 
                                    value={city} />

                                <LabelInput 
                                    controlId="patientStreet" 
                                    className={style.Input} 
                                    label="Ulica" 
                                    onInput={SetFormInputHandler} 
                                    required 
                                    value={street} />

                                <LabelInput 
                                    controlId="patientStreetNumber" 
                                    className={style.Input_w50} 
                                    label="Nr domu" 
                                    onInput={SetFormInputHandler} 
                                    required 
                                    value={streetNumber} />

                                <LabelInput 
                                    controlId="patientZipCode"
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
                                    controlId="visitDate"
                                    className={style.Input_w50}
                                    label="Data"
                                    inputType='date'
                                    onInput={SetFormInputHandler} 
                                    required 
                                    value={visitDate} />

                                <LabelInput 
                                    controlId="visitClock" 
                                    className={style.Input_w50} 
                                    label="Godzina" 
                                    inputType='time'
                                    onInput={SetFormInputHandler} 
                                    required 
                                    value={visitClock} />

                                <TextArea 
                                    controlId="visitNote" 
                                    className={style.TextArea} 
                                    label="Notatka" 
                                    rows={5} 
                                    onChange={SetFormInputHandler} 
                                    required 
                                    defaultValue={visitNote} />
                            </div>
                        </div>
                    </div>
                    <div className={style.ButtonSection}>
                        <VisitStatusButtonSection visitStatus={visitState} formIsValid={formIsValid} />
                        <button id={style.ActionButton} disabled={!formIsValid}>
                            {
                                visitToEdit ? "Edytuj wizytę" : "Zaplanuj wizytę" 
                            }
                        </button>
                    </div>
                </form>
        </OverlayModel>
    )
}

export default VisitForm