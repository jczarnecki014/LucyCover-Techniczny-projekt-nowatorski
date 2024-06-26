import style from './css/PatientDocumentationSections.module.css'
import SelectInput from '@mui/material/Select/SelectInput';
import LabelInput from '../../../../utility/LabelInput'

const BaseInformation = ({SetFormInputHandler,formInputs,readOnlyMode,childrenList}) => {
    const isReadonly = readOnlyMode;
    console.log(childrenList)
    const childrenNameList = [];
    // forEach(let children in childrenList) {

    // }
    return (
        <>
        {
            !isReadonly && (
                <section className={style.PatientFormSection}>
                    <span>
                        <h6>Informacje podstawowe</h6>
                        <hr />
                        <SelectInput controlId='patientChildrenName' label='Imie i nazwisko dziecka' className={style.FullInput} onInput={SetFormInputHandler} value={formInputs.patientChildrenName} required />
                        <LabelInput controlId='visitDate' label='Data wizyty' className={style.FullInput} onInput={SetFormInputHandler}inputType="date" value={formInputs.visitDate} required />
                    </span>
                </section>
    )
        }
        </>
    )
}

export default BaseInformation