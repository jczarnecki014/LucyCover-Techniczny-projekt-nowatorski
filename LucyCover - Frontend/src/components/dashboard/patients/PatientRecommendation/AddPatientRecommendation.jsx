import style from './css/AddPatientRecommendation.module.css'

import { useDispatch,useSelector } from 'react-redux'
import { SetInput } from '../../../../context/slices/AddPatientRecommendation'

import OverlayModel from "../../../utility/OverlayModel"
import LabelInput from '../../../utility/LabelInput'
import TextArea from '../../../utility/TextArea'
import { MdKeyboardArrowRight } from "react-icons/md";
import CheckFormIsValid from '../../../../assets/Validation/CheckFormIsValid'

const AddPatientRecommendation = () => {

    const todayDate = new Date().toISOString().split('T')[0];
    
    const dispatch = useDispatch()

    const formInputs = useSelector(state => state.addPatientRecommendation.formInputs)
    const formIsValid = CheckFormIsValid(formInputs)
    
    const SetFormInputHandler = ({inputId,inputObject}) => {
        dispatch(SetInput({inputId,inputObject}))
    }

    return (
        <OverlayModel title="Dodaj nowe zalecenie">
            <form>
                <LabelInput controlId='title' label="Tytuł zalecenia" onInput={SetFormInputHandler} required />
                <LabelInput controlId='date' label="Data zalecenia" onInput={SetFormInputHandler} inputType="date" value={todayDate} />
                <TextArea controlId='description' label="Opis zalecenia" onChange={SetFormInputHandler} rows={10} required />
                <section className={style.PatientFormButtonSection}>
                    <button disabled={!formIsValid}>Zapisz <MdKeyboardArrowRight /> </button>
                </section>
            </form>
        </OverlayModel>
    )
}

export default AddPatientRecommendation