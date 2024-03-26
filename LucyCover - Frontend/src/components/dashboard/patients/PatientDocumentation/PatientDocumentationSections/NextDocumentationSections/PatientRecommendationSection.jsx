import LabelInput from "../../../../../utility/LabelInput";
import SelectInput from "../../../../../utility/SelectInput";
import TextArea from "../../../../../utility/TextArea";

import style from '../css/PatientDocumentationSections.module.css'


const PatientRecommendationSection = ({SetFormInputHandler,formInputs,readlOnlyMode}) => {

    const isReadonly = readlOnlyMode;

    return (
        <section className={style.PatientFormSection}>
            <h6>Zalecenia</h6>
            <hr />
            <span>
                <SelectInput controlId='PostureCorection' label="Korekta pozycji" className={style.StandardInput} options={["Tak", "Nie"]} onChange={SetFormInputHandler} defaultOption={formInputs.PostureCorection} value={formInputs.PostureCorection} readonly={isReadonly} />

                <SelectInput controlId='SuckTraining' label="Trening ssania" className={style.StandardInput} options={["Tak", "Nie"]} onChange={SetFormInputHandler} defaultOption={formInputs.SuckTraining} readonly={isReadonly} />

                <LabelInput controlId='BabyFatten' label='Dokarmianie (czym? jak? ile?)' className={style.FullInput} onInput={SetFormInputHandler} value={formInputs.BabyFatten} readonly={isReadonly} />

                <TextArea controlId='OtherRecommendation' label="Inne" className={style.FullInput} onChange={SetFormInputHandler} value={formInputs.OtherRecommendation} readonly={isReadonly} />

            </span>
    </section>
    )
}

export default PatientRecommendationSection;