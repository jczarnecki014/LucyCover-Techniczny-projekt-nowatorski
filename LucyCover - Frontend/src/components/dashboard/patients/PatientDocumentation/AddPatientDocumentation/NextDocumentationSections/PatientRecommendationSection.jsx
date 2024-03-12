import LabelInput from "../../../../../utility/LabelInput";
import SelectInput from "../../../../../utility/SelectInput";
import TextArea from "../../../../../utility/TextArea";

import style from '../css/AddPatientDocumentation_FORMS.module.css'


const PatientRecommendationSection = ({SetFormInputHandler,formInputs}) => {
    return (
        <section className={style.PatientFormSection}>
            <h6>Zalecenia</h6>
            <hr />
            <span>
                <SelectInput controlId='PostureCorection' label="Korekta pozycji" className={style.StandardInput} options={["Tak", "Nie"]} 
                                onChange={SetFormInputHandler} defaultOption={formInputs.PostureCorection.value}  />

                <SelectInput controlId='SuckTraining' label="Trening ssania" className={style.StandardInput} options={["Tak", "Nie"]} 
                                onChange={SetFormInputHandler} defaultOption={formInputs.SuckTraining.value} />

                <LabelInput controlId='BabyFatten' label='Dokarmianie (czym? jak? ile?)' className={style.FullInput} onInput={SetFormInputHandler}/>

                <TextArea controlId='OtherRecommendation' label="Inne" className={style.FullInput} onChange={SetFormInputHandler}/>

            </span>
    </section>
    )
}

export default PatientRecommendationSection;