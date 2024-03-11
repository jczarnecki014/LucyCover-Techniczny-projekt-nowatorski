import LabelInput from "../../../../../utility/LabelInput";
import SelectInput from "../../../../../utility/SelectInput";

import style from '../css/AddPatientDocumentation_FORMS.module.css'


const PatientMedicineSection = ({SetFormInputHandler}) => {
    return (
        <section className={style.PatientFormSection}>
            <h6>Stosowane leki/ użwyki/ antykoncepcja</h6>
            <hr />
            <span>
                <LabelInput controlId='PatientMedicationsUsed' label='Matka' className={style.StandardInput} required onInput={SetFormInputHandler} />
                <LabelInput controlId='BabyMedicationsUsed' label='Dziecko' className={style.StandardInput} required onInput={SetFormInputHandler} />
                <SelectInput controlId='PatientPeriodAfterDelivery' label="Miesiączka po porodzie" className={style.StandardInput} options={["Nie", "Tak"]} 
                            onChange={SetFormInputHandler} />

                {/* Opcjonalnie */}
                <LabelInput controlId='PatientPeriodAfterDelivery_WHEN' label='Kiedy' className={style.StandardInput} onInput={SetFormInputHandler}/>
            </span>
    </section>
    )
}

export default PatientMedicineSection;