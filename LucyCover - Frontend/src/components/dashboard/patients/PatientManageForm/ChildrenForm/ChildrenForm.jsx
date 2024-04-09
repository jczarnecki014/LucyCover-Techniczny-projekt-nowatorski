import { useSelector,useDispatch } from 'react-redux';
import { SetChildrenInput,ResetChildrenInputs } from '../../../../../context/slices/AddPatientForm';
import { useFormData } from '../../../../../hooks/useFormData';

import style from '../css/ChildrenAddingForm.module.css'

import OverlayModel from "../../../../utility/OverlayModel";
import { PiBabyBold } from "react-icons/pi";
import LabelInput from '../../../../utility/LabelInput';
import CheckFormIsValid from '../../../../../assets/Validation/CheckFormIsValid';

const ChildrenForm = ({changeFormMode,AddChildrenToList,defaultValue,EditChildren}) => {

    const currentDate = new Date().toISOString().split('T')[0];

    const updatingMode = defaultValue ? true:false;

    const getValue = useFormData();

    const ChildrenInputs = useSelector(state => state.addPatientForm.childrenInputs)
    const defaultChildrenInputs = updatingMode ? defaultValue : getValue(ChildrenInputs);

    let FormIsValid = CheckFormIsValid(ChildrenInputs);

    const dispach = useDispatch()

    const SetChildrenInputHandler = ({inputId,inputObject}) => {
        dispach(SetChildrenInput({inputId,inputObject}))
    }

    const FormSubmitHandler = (event) => {
        event.preventDefault();
        const children = {
            firstName: ChildrenInputs.firstName.value,
            lastName: ChildrenInputs.lastName.value,
            birthDay: ChildrenInputs.birthDay.value,
            birthPlace: ChildrenInputs.birthPlace.value,
        }

        if(updatingMode){
            EditChildren({
                id:defaultValue.id,
                ...children
            })
        }
        else {
            AddChildrenToList(children)
        }
        
        dispach(ResetChildrenInputs())
        changeFormMode('patient');
    }

    const QuitButtonClickHandler = () => {
        dispach(ResetChildrenInputs())
        changeFormMode('patient')
    }

    return (
        <OverlayModel title={updatingMode ? 'Edytuj dziecko':'Dodaj dziecko'} smallSize={true} OnQuitButtonClick={QuitButtonClickHandler}>
            <form className={style.ChildrenddingForm} onSubmit={FormSubmitHandler}>
                <div className={style.ChildrenIcon}>
                    <PiBabyBold size={70} />
                </div>
                <div className={style.ChildrenInputs}>
                    <LabelInput className={style.Input} controlId='firstName' label="Imię" onInput={SetChildrenInputHandler} value={defaultChildrenInputs.firstName} required />

                    <LabelInput className={style.Input} controlId='lastName' label="Nazwisko" onInput={SetChildrenInputHandler} value={defaultChildrenInputs.lastName} required />

                    <LabelInput className={style.Input} controlId='birthDay' label="Data urodzenia" inputType='date' onInput={SetChildrenInputHandler} value={defaultChildrenInputs.birthDay} max={currentDate} required />

                    <LabelInput className={style.Input} controlId='birthPlace' label="Miejsce urodzenia" onInput={SetChildrenInputHandler} value={defaultChildrenInputs.birthPlace} required />
                    
                    <button className={style.SubmitButton} disabled={!FormIsValid} type='submit'>{updatingMode ? 'Edytuj':'Dodaj'}</button>
                </div>
            </form>
        </OverlayModel>
    )
}

export default ChildrenForm;