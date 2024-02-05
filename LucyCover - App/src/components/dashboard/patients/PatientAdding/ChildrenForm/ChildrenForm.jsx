import { useSelector,useDispatch } from 'react-redux';
import { SetChildrenInput,ResetChildrenInputs } from '../../../../../context/slices/AddPatientForm';

import style from '../../css/ChildrenAddingForm.module.css'

import OverlayModel from "../../../../utility/OverlayModel";
import { PiBabyBold } from "react-icons/pi";
import LabelInput from '../../../../utility/LabelInput';

const ChildrenForm = ({changeFormMode,AddChildrenToList}) => {
    
    const ChildrenInputs = useSelector(state => state.addPatientForm.childrenInputs)
    const dispach = useDispatch()

    console.log(ChildrenInputs)

    const FormIsValid = ChildrenInputs.firstName.isValid && 
                        ChildrenInputs.lastName.isValid && 
                        ChildrenInputs.birthDay.isValid && 
                        ChildrenInputs.birthPlace.isValid;
    

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

        AddChildrenToList(children)
        dispach(ResetChildrenInputs())
        changeFormMode('patient');
    }

    const QuitButtonClickHandler = () => {
        dispach(ResetChildrenInputs())
        changeFormMode('patient')
    }

    return (
        <OverlayModel title='Dodaj dziecko' smallSize={true} OnQuitButtonClick={QuitButtonClickHandler}>
            <form className={style.ChildrenddingForm} onSubmit={FormSubmitHandler}>
                <div className={style.ChildrenIcon}>
                    <PiBabyBold size={70} />
                </div>
                <div className={style.ChildrenInputs}>
                    <LabelInput className={style.Input} controlId='firstName' label="Imię" onInput={SetChildrenInputHandler} required />
                    <LabelInput className={style.Input} controlId='lastName' label="Nazwisko" onInput={SetChildrenInputHandler} required />
                    <LabelInput className={style.Input} controlId='birthDay' label="Data urodzenia" inputType='date' onInput={SetChildrenInputHandler} required />
                    <LabelInput className={style.Input} controlId='birthPlace' label="Miejsce urodzenia" onInput={SetChildrenInputHandler} required />
                    <button className={style.SubmitButton} disabled={!FormIsValid} type='submit'>Dodaj</button>
                </div>
            </form>
        </OverlayModel>
    )
}

export default ChildrenForm;