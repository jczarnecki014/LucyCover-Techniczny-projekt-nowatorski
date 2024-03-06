import { useState } from "react"

import { MdKeyboardArrowRight } from "react-icons/md";

import OverlayModel from "../../../../utility/OverlayModel"
import LabelInput from "../../../../utility/LabelInput"
import SelectInput from "../../../../utility/SelectInput"

import style from './css/AddPatientDocumentation_FIRST.module.css'
import TextArea from "../../../../utility/TextArea"

const AddPatientDocumentation_FIRST = () => {

    const [babyBirthTimeIsVisible,setBabyBirthTimeIsVisible] = useState(false)
    const [babyBirthTypeReasonIsVisible,setBbabyBirthTypeReasonIsVisible] = useState(false)
    const [motherBreastfeedBefore,setMotherBreastfeedBefore] = useState('')

    return (
        <OverlayModel title="Dodaj nową dokumentacje">
            <form className={style.Container}>
                <div className={style.LeftSide}>
                    <section className={style.PatientFormSection}>
                        <h5>Karta porady laktacyjnej</h5>
                        <h6>Dane matki</h6>
                        <hr />
                        <span>
                            <LabelInput controlId='motherFirstName' label='Imie' className={style.StandardInput} />
                            <LabelInput controlId='motherLastName' label='Nazwisko' className={style.StandardInput} />
                            <LabelInput controlId='motherAge' label='Wiek' className={style.StandardInput} />
                            <LabelInput controlId='motherProfesion' label='Zawód' className={style.StandardInput} />
                            <LabelInput controlId='motherAddress' label='Adres' className={style.FullInput} />
                        </span>
                    </section>
                    <section className={style.PatientFormSection}>
                        <h6>Dane dziecka</h6>
                        <hr />
                        <span>
                            <LabelInput controlId='babyFirstName' label='Imie' className={style.StandardInput} />
                            <LabelInput controlId='babyAge' label='Wiek' className={style.StandardInput} />
                            <LabelInput controlId='babyBirthDay' label='Data urodzenia dziecka' className={style.FullInput} inputType='date' />
                            <LabelInput controlId='babyBirthPlace' label='Miejsce urodzenia (szpital)' className={style.FullInput} />
                            <LabelInput controlId='babyApgarScore' label='Apgar' className={style.StandardInput} />

                            <SelectInput controlId='babyBirthTime' label="Urodzone" className={style.StandardInput} options={["O czasie", "Wcześniej", "Później"]} defaultOption="Czas urodzenia" 
                                         onChange={(value) => (value === 'Wcześniej' || value === 'Później') ? setBabyBirthTimeIsVisible(true) : setBabyBirthTimeIsVisible(false) }/>
                            {
                                babyBirthTimeIsVisible && <LabelInput controlId='babyBirthTime_ADDITIONAL' label='O ile' className={style.FullInput} />
                            }

                            <SelectInput controlId='babyBirthType' label="Poród" className={style.FullInput} options={["Naturalny", "Zabiegowy", "Cięcie cesarskie"]} defaultOption="Rodzaj porodu" 
                                        onChange={(value) => (value === 'Zabiegowy' || value === 'Cięcie cesarskie') ? setBbabyBirthTypeReasonIsVisible(true) : setBbabyBirthTypeReasonIsVisible(false) } />
                            
                            {
                                babyBirthTypeReasonIsVisible && <LabelInput controlId='babyBirthTypeReason' label='Powód takiego porodu' className={style.FullInput} />
                            }

                            <LabelInput controlId='babyBirthMedicine' label='Leki podczas porodu' className={style.FullInput} />

                        </span>
                    </section>
                </div>
                <div className={style.RightSide}>
                    <TextArea controlId='documentationReason' label="Powód zgłoszenia" className={style.FullInput} />
                    <section className={style.PatientFormSection}>
                        <h6>Wywiad rodzinny</h6>
                        <hr />
                        <span>
                            <SelectInput controlId='motherBreastfeedBefore ' label="Karmienie poprzednich dzieci piersią" className={style.FullInput} options={['Pierwsze dziecko',"Tak", "Nie"]} defaultOption="Czy karmiła ?" 
                                        onChange={(value) => setMotherBreastfeedBefore(value) } />
                            
                            {
                                motherBreastfeedBefore === 'Tak' && <LabelInput controlId='motherBreastfeedBefore_HowLong' label='Jak długo karmiła ?' className={style.FullInput} />
                            }

                            {
                                motherBreastfeedBefore === 'Nie' && <LabelInput controlId='motherBreastfeedBefore_HowLong' label='Dlaczego nie karmiła ?' className={style.FullInput} />
                            }
                        </span>
                    </section>

                    <section className={style.PatientFormButtonSection}>
                            <button>Zapisz <MdKeyboardArrowRight /> </button>
                    </section>
                </div>
            </form>
        </OverlayModel>
    )
}

export default AddPatientDocumentation_FIRST