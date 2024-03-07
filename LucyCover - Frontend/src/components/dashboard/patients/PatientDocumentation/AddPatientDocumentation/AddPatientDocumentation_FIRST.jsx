import { useDispatch,useSelector } from "react-redux";
import { SetInput } from "../../../../../context/slices/AddFirstDocumentationForm";

import { MdKeyboardArrowRight } from "react-icons/md";

import OverlayModel from "../../../../utility/OverlayModel"
import LabelInput from "../../../../utility/LabelInput"
import SelectInput from "../../../../utility/SelectInput"

import style from './css/AddPatientDocumentation_FIRST.module.css'
import TextArea from "../../../../utility/TextArea"
import CheckFormIsValid from "../../../../../assets/Validation/CheckFormIsValid";

const AddPatientDocumentation_FIRST = () => {

    const dispatch = useDispatch();
    const formInputs = useSelector(state => state.addFirstDocumentationForm.formInputs)

    const formIsValid = CheckFormIsValid(formInputs)

    const SetFormInputHandler = ({inputId,inputObject}) => {
        dispatch(SetInput({inputId,inputObject}))
    }

    return (
        <OverlayModel title="Dodaj nową dokumentacje">
            <form className={style.Container}>
                <div className={style.LeftSide}>
                    <section className={style.PatientFormSection}>
                        <h5>Karta porady laktacyjnej</h5>
                        <h6>Dane matki</h6>
                        <hr />
                        <span>
                            <LabelInput controlId='motherFirstName' label='Imie' className={style.StandardInput} required onInput={SetFormInputHandler} />
                            <LabelInput controlId='motherLastName' label='Nazwisko' className={style.StandardInput} required onInput={SetFormInputHandler} />
                            <LabelInput controlId='motherAge' label='Wiek' className={style.StandardInput} required onInput={SetFormInputHandler} />
                            <LabelInput controlId='motherProfesion' label='Zawód' className={style.StandardInput} required onInput={SetFormInputHandler} />
                            <LabelInput controlId='motherAddress' label='Adres' className={style.FullInput} required onInput={SetFormInputHandler} />
                        </span>
                    </section>
                    <section className={style.PatientFormSection}>
                        <h6>Dane dziecka</h6>
                        <hr />
                        <span>
                            <LabelInput controlId='babyFirstName' label='Imie' className={style.StandardInput} required onInput={SetFormInputHandler} />
                            <LabelInput controlId='babyAge' label='Wiek' className={style.StandardInput} required onInput={SetFormInputHandler} />
                            <LabelInput controlId='babyBirthDay' label='Data urodzenia dziecka' className={style.FullInput} inputType='date' required onInput={SetFormInputHandler} />
                            <LabelInput controlId='babyBirthPlace' label='Miejsce urodzenia (szpital)' className={style.FullInput} required onInput={SetFormInputHandler} />
                            <LabelInput controlId='babyApgarScore' label='Apgar' className={style.StandardInput} required onInput={SetFormInputHandler} />

                            <SelectInput controlId='babyBirthTime' label="Urodzone" className={style.StandardInput} options={["O czasie", "Wcześniej", "Później"]} 
                                         onChange={SetFormInputHandler} />
                            {
                                ['Wcześniej','Później'].includes(formInputs.babyBirthTime.value) && <LabelInput controlId='babyBirthTime_ADDITIONAL' label='O ile' className={style.FullInput} onInput={SetFormInputHandler} />
                            }

                            <SelectInput controlId='babyBirthType' label="Poród" className={style.FullInput} options={["Naturalny", "Zabiegowy", "Cięcie cesarskie"]} 
                                        onChange={SetFormInputHandler} />
                            
                            {
                                ['Zabiegowy','Cięcie cesarskie'].includes(formInputs.babyBirthType.value) && <LabelInput controlId='babyBirthTypeReason' label='Powód takiego porodu' className={style.FullInput} onInput={SetFormInputHandler} />
                            }

                            <LabelInput controlId='babyBirthMedicine' label='Leki podczas porodu' className={style.FullInput} required onInput={SetFormInputHandler}/>

                        </span>
                    </section>
                </div>
                <div className={style.RightSide}>

                    <TextArea controlId='documentationReason' label="Powód zgłoszenia" className={style.FullInput} onChange={SetFormInputHandler}/>

                    <section className={style.PatientFormSection}>
                        <h6>Wywiad rodzinny</h6>
                        <hr />
                        <span>
                            <SelectInput controlId="motherBreastfeedBefore" label="Karmienie poprzednich dzieci piersią" className={style.FullInput} options={['Pierwsze dziecko',"Tak", "Nie"]} 
                                        onChange={SetFormInputHandler} />
                            
                            {
                                formInputs.motherBreastfeedBefore.value === 'Tak' && <LabelInput controlId='motherBreastfeedBefore_HowLong' label='Jak długo karmiła ?' className={style.FullInput} onInput={SetFormInputHandler}/>
                            }

                            {
                                formInputs.motherBreastfeedBefore.value === 'Nie' && <LabelInput controlId='motherBreastfeedBefore_Why' label='Dlaczego nie karmiła ?' className={style.FullInput} onInput={SetFormInputHandler}/>
                            }
                        </span>
                    </section>

                    <section className={style.PatientFormButtonSection}>
                            <button disabled={!formIsValid}>Zapisz <MdKeyboardArrowRight /> </button>
                    </section>
                </div>
            </form>
        </OverlayModel>
    )
}

export default AddPatientDocumentation_FIRST