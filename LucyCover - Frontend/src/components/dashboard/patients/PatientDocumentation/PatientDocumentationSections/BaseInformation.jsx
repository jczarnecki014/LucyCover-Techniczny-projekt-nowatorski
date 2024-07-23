import style from './css/PatientDocumentationSections.module.css'
import LabelInput from '../../../../utility/LabelInput'
import SelectList from '../../../../utility/SelectList';

const BaseInformation = ({SetFormInputHandler,formInputs,readOnlyMode,childrenList}) => {
    const isReadonly = readOnlyMode;
    const childrenSelectOptions = [];

    childrenList.forEach((child) => {
        let label = `${child.childFirstName} ${child.childLastName}`
        let value = child.id
        let listObject = {label,value}
        childrenSelectOptions.push(listObject) 
    })
    return (
        <>
        {
            !isReadonly && (
                <section className={style.PatientFormSection}>
                    <span>
                        <h6>Informacje podstawowe</h6>
                        <hr />
                        <SelectList controlId='patientChildId' label='Imie i nazwisko dziecka' className={style.FullInput} onChange={SetFormInputHandler} options={childrenSelectOptions} defaultOption={formInputs.patientChildId} required />

                        <LabelInput controlId='visitDate' label='Data wizyty' className={style.FullInput} onInput={SetFormInputHandler}inputType="date" value={formInputs.visitDate} required />
                    </span>
                </section>
    )
        }
        </>
    )
}

export default BaseInformation