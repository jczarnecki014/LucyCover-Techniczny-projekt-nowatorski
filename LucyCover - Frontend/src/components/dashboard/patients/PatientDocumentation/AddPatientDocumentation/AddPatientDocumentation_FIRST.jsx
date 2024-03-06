import OverlayModel from "../../../../utility/OverlayModel"
import LabelInput from "../../../../utility/LabelInput"
import SelectInput from "../../../../utility/SelectInput"

import style from './css/AddPatientDocumentation_FIRST.module.css'

const AddPatientDocumentation_FIRST = () => {
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
                            <SelectInput label="Urodzone" className={style.StandardInput} options={["O czasie", "Wczesniej", "Później"]} defaultOption="Czas urodzenia"/>
                        </span>
                    </section>
                </div>
                <div className={style.LeftSide}>
                    right
                </div>
            </form>
        </OverlayModel>
    )
}

export default AddPatientDocumentation_FIRST