//Components
import OverlayModel from "@components/utility/OverlayModel";
import { PiBabyBold } from "react-icons/pi";
import LabelInput from '@components/utility/LabelInput';
//Style
import style from '../css/ChildrenAddingForm.module.css'
//Hooks
import { useSelector,useDispatch } from 'react-redux';
import { useFormData } from '@hooks/useFormData';
import { useCallback } from "react";
import useInputsSilce from "@hooks/useInputsSlice";
//Context
import { SetChildrenInput,ResetChildrenInputs } from '@context/slices/AddPatientForm';
//Assets
import CheckFormIsValid from '@assets/validation/CheckFormIsValid';


/**
 * ChildrenForm - Component to display children manage form
 * 
 *  Parrent component : <PatientManageForm />
 * 
 * Params:
 * 
 * @param {} changeFormMode - Function to change PatientManageForm when "close" click
 * 
 * @param {} AddChildrenToList - Function will call when "Add" button click (on new child mode adding)
 * 
 * @param {} EditChildren - Function will call when "Edit" button click (on edit mode)
 * 
 * @param {} defaultValue - Default form inputs value when child is updating
 */

const ChildrenForm = ({changeFormMode,AddChildrenToList,defaultValue,EditChildren}) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const updatingMode = defaultValue ? true:false;
    const dispatch = useDispatch();

    const getValue = useFormData();
    const ChildrenInputs = useSelector(state => state.addPatientForm.childrenInputs)
    const defaultChildrenInputs = updatingMode ? defaultValue : getValue(ChildrenInputs);

    let FormIsValid = CheckFormIsValid(ChildrenInputs);

    const SetChildrenInputHandler = useCallback(useInputsSilce(SetChildrenInput),[SetChildrenInput])

    const FormSubmitHandler = (event) => {
        event.preventDefault();
        const children = {
            childFirstName: ChildrenInputs.childFirstName.value,
            childLastName: ChildrenInputs.childLastName.value,
            childBirthDate: ChildrenInputs.childBirthDate.value,
            childBirthPlace: ChildrenInputs.childBirthPlace.value,
        }

        if(updatingMode){
            EditChildren({
                id:defaultValue.id,
                index:defaultValue.index,
                ...children
            })
        }
        else {
            AddChildrenToList(children)
        }
        
        dispatch(ResetChildrenInputs())
        changeFormMode('patient');
    }

    const QuitButtonClickHandler = () => {
        dispatch(ResetChildrenInputs())
        changeFormMode('patient')
    }

    return (
        <OverlayModel title={updatingMode ? 'Edytuj dziecko':'Dodaj dziecko'} smallSize={true} OnQuitButtonClick={QuitButtonClickHandler}>
            <form className={style.ChildrenddingForm} onSubmit={FormSubmitHandler}>
                <div className={style.ChildrenIcon}>
                    <PiBabyBold size={70} />
                </div>
                <div className={style.ChildrenInputs}>
                    <LabelInput className={style.Input} controlId='childFirstName' label="Imię" onInput={SetChildrenInputHandler} value={defaultChildrenInputs.childFirstName} required />

                    <LabelInput className={style.Input} controlId='childLastName' label="Nazwisko" onInput={SetChildrenInputHandler} value={defaultChildrenInputs.childLastName} required />

                    <LabelInput className={style.Input} controlId='childBirthDate' label="Data urodzenia" inputType='date' onInput={SetChildrenInputHandler} value={defaultChildrenInputs.childBirthDate} max={currentDate} required />

                    <LabelInput className={style.Input} controlId='childBirthPlace' label="Miejsce urodzenia" onInput={SetChildrenInputHandler} value={defaultChildrenInputs.childBirthPlace} required />
                    
                    <button className={style.SubmitButton} disabled={!FormIsValid} type='submit'>{updatingMode ? 'Edytuj':'Dodaj'}</button>
                </div>
            </form>
        </OverlayModel>
    )
}

export default ChildrenForm;