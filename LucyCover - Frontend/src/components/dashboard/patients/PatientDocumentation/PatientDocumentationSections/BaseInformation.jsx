import style from './css/PatientDocumentationSections.module.css'

import LabelInput from '../../../../utility/LabelInput'

const BaseInformation = ({SetFormInputHandler,formInputs,readOnlyMode}) => {
    const isReadonly = readOnlyMode;
    return (
        <>
        {
            !isReadonly && (
                <section className={style.PatientFormSection}>
                    <span>
                        <h6>Informacje podstawowe</h6>
                        <hr />
                        <LabelInput controlId='PatientChildrenName' label='Imie i nazwisko dziecka' className={style.FullInput} onInput={SetFormInputHandler} value={formInputs.patientChildrenName} required />
                        <LabelInput controlId='visitDate' label='Data wizyty' className={style.FullInput} onInput={SetFormInputHandler}inputType="date" value={formInputs.visitDate} required />
                    </span>
                </section>
    )
        }
        </>
    )
}

export default BaseInformation