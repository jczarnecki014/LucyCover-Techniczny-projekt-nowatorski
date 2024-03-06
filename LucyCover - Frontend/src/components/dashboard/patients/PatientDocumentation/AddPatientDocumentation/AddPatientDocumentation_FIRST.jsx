import { useState } from "react"

import OverlayModel from "../../../../utility/OverlayModel"
import LabelInput from "../../../../utility/LabelInput"
import SelectInput from "../../../../utility/SelectInput"

import style from './css/AddPatientDocumentation_FIRST.module.css'

const AddPatientDocumentation_FIRST = () => {

    const [babyBirthTimeIsVisible,setBabyBirthTimeIsVisible] = useState(false)
    const [babyBirthTypeReasonIsVisible,setBbabyBirthTypeReasonIsVisible] = useState(false)

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
                            <LabelInput controlId='motherAge' label='Wiek' className={style.SmallInput} />
                            <LabelInput controlId='motherAddress' label='Adres' className={style.FullInput} />
                            <LabelInput controlId='motherProfesion' label='Zawód' className={style.FullInput} />
                        </span>
                    </section>
                    <section className={style.PatientFormSection}>
                        <h6>Dane dziecka</h6>
                        <hr />
                        <span>
                            <LabelInput controlId='babyFirstName' label='Imie' className={style.StandardInput} />
                            <LabelInput controlId='babyBirthDay' label='Data urodzenia dziecka' className={style.StandardInput} inputType='date' />
                            <LabelInput controlId='babyAge' label='Wiek' className={style.SmallInput} />
                            <LabelInput controlId='babyBirthPlace' label='Miejsce urodzenia (szpital)' className={style.FullInput} />
                            <LabelInput controlId='babyApgarScore' label='Punkty Apgar' className={style.SmallInput} />
                            <LabelInput controlId='babyApgarScore' label='Wiek' className={style.StandardInput} />

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
                    <LabelInput controlId='babyBirthMedicine' label='Leki podczas porodu' className={style.FullInput} type="textarea" />
                </div>
            </form>
        </OverlayModel>
    )
}

export default AddPatientDocumentation_FIRST