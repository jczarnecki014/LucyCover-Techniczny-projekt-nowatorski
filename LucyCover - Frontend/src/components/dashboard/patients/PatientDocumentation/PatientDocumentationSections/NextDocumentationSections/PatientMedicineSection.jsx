import LabelInput from "../../../../../utility/LabelInput";
import SelectInput from "../../../../../utility/SelectInput";

import style from '../css/PatientDocumentationSections.module.css'


const PatientMedicineSection = ({SetFormInputHandler,formInputs,readlOnlyMode}) => {

    const isReadonly = readlOnlyMode;

    return (
        <section className={style.PatientFormSection}>
            <h6>Stosowane leki/ użwyki/ antykoncepcja</h6>
            <hr />
            <span>
                <LabelInput controlId='PatientMedicationsUsed' label='Matka' className={style.StandardInput} onInput={SetFormInputHandler} value={formInputs.PatientMedicationsUsed} readonly={isReadonly} />

                <LabelInput controlId='BabyMedicationsUsed' label='Dziecko' className={style.StandardInput} onInput={SetFormInputHandler} value={formInputs.BabyMedicationsUsed} readonly={isReadonly} />

                <SelectInput controlId='PatientPeriodAfterDelivery' label="Miesiączka po porodzie" className={style.FullInput} options={["Nie", "Tak"]} onChange={SetFormInputHandler} defaultOption={formInputs.PatientPeriodAfterDelivery} readonly={isReadonly} />

                {
                    formInputs.PatientPeriodAfterDelivery === 'Tak' && <LabelInput controlId='PatientPeriodAfterDelivery_WHEN' label='Kiedy' className={style.FullInput} onInput={SetFormInputHandler} value={formInputs.PatientPeriodAfterDelivery_WHEN} readonly={isReadonly} />
                }
            </span>
    </section>
    )
}

export default PatientMedicineSection;