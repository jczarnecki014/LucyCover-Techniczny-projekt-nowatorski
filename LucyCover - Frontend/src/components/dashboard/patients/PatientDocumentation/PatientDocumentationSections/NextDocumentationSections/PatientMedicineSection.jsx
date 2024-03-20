import LabelInput from "../../../../../utility/LabelInput";
import SelectInput from "../../../../../utility/SelectInput";

import style from '../css/PatientDocumentationSections.module.css'


const PatientMedicineSection = ({SetFormInputHandler,formInputs}) => {
    return (
        <section className={style.PatientFormSection}>
            <h6>Stosowane leki/ użwyki/ antykoncepcja</h6>
            <hr />
            <span>
                <LabelInput controlId='PatientMedicationsUsed' label='Matka' className={style.StandardInput} onInput={SetFormInputHandler} />
                <LabelInput controlId='BabyMedicationsUsed' label='Dziecko' className={style.StandardInput} onInput={SetFormInputHandler} />
                <SelectInput controlId='PatientPeriodAfterDelivery' label="Miesiączka po porodzie" className={style.FullInput} options={["Nie", "Tak"]} 
                            onChange={SetFormInputHandler} defaultOption={formInputs.PatientPeriodAfterDelivery.value} />

                {
                    formInputs.PatientPeriodAfterDelivery.value === 'Tak' && <LabelInput controlId='PatientPeriodAfterDelivery_WHEN' label='Kiedy' 
                                                                                         className={style.FullInput} onInput={SetFormInputHandler}/>
                }
            </span>
    </section>
    )
}

export default PatientMedicineSection;