import LabelInput from "../../../../../utility/LabelInput";
import SelectInput from "../../../../../utility/SelectInput";

import style from '../css/PatientDocumentationSections.module.css'


const PatientMedicineSection = ({SetFormInputHandler,formInputs,readOnlyMode}) => {

    const isReadonly = readOnlyMode;

    return (
        <section className={style.PatientFormSection}>
            <h6>Stosowane leki/ użwyki/ antykoncepcja</h6>
            <hr />
            <span>
                <LabelInput controlId='patientMedicationsUsed' label='Matka' className={style.StandardInput} onInput={SetFormInputHandler} value={formInputs.patientMedicationsUsed} readonly={isReadonly} />

                <LabelInput controlId='babyMedicationsUsed' label='Dziecko' className={style.StandardInput} onInput={SetFormInputHandler} value={formInputs.babyMedicationsUsed} readonly={isReadonly} />

                <SelectInput controlId='patientPeriodAfterDelivery' label="Miesiączka po porodzie" className={style.FullInput} options={["Nie", "Tak"]} onChange={SetFormInputHandler} defaultOption={formInputs.patientPeriodAfterDelivery} readonly={isReadonly} />

                {
                    formInputs.patientPeriodAfterDelivery === 'Tak' && <LabelInput controlId='patientPeriodAfterDelivery_WHEN' label='Kiedy' className={style.FullInput} onInput={SetFormInputHandler} value={formInputs.patientPeriodAfterDelivery_WHEN} readonly={isReadonly} />
                }
            </span>
    </section>
    )
}

export default PatientMedicineSection;