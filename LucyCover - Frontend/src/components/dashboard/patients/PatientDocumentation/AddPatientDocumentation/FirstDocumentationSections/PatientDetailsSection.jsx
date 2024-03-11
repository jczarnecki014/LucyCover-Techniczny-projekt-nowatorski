import style from '../css/AddPatientDocumentation_FORMS.module.css'

import LabelInput from '../../../../../utility/LabelInput'

const PatientDetailsSection = ({SetFormInputHandler}) => {
    return (
        <section className={style.PatientFormSection}>
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
    )
}

export default PatientDetailsSection