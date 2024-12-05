//Components
import LabelInput from '@components/utility/LabelInput'
//Style
import style from '../css/PatientDocumentationSections.module.css'

/**
 * PatientDetailsSection - component to display patient details information
 * 
 * Parent component: NextDocumentation
 */

const PatientDetailsSection = ({SetFormInputHandler,readOnlyMode,formInputs}) => {
    const isReadonly = readOnlyMode;
    return (
        <section className={style.PatientFormSection}>
            <h6>Dane matki</h6>
            <hr />
            <span>
                <LabelInput controlId='motherFirstName' label='Imie' className={style.StandardInput} required onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.motherFirstName} />
                <LabelInput controlId='motherLastName' label='Nazwisko' className={style.StandardInput} required onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.motherLastName} />
                <LabelInput controlId='motherAge' label='Wiek' className={style.StandardInput} onInput={SetFormInputHandler} maxLenght={3} required readonly={isReadonly} value={formInputs.motherAge} />
                <LabelInput controlId='motherProfesion' label='Zawód' className={style.StandardInput} required onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.motherProfesion} />
                <LabelInput controlId='motherAddress' label='Adres' className={style.FullInput} required onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.motherAddress} />
            </span>
        </section>
    )
}

export default PatientDetailsSection