import LabelInput from "@components/utility/LabelInput";
import SelectInput from "@components/utility/SelectInput";
import TextArea from "@components/utility/TextArea";

import style from '../css/PatientDocumentationSections.module.css'

/**
 * PatientRecommendationSection - component to display recommendation section
 * 
 * Parent component: NextDocumentation
 */

const PatientRecommendationSection = ({SetFormInputHandler,formInputs,readOnlyMode}) => {
    const isReadonly = readOnlyMode;

    return (
        <section className={style.PatientFormSection}>
            <h6>Zalecenia</h6>
            <hr />
            <span>
                <SelectInput controlId='postureCorection' label="Korekta pozycji" className={style.StandardInput} options={["Tak", "Nie"]} onChange={SetFormInputHandler} defaultOption={formInputs.postureCorection} readonly={isReadonly} />

                <SelectInput controlId='suckTraining' label="Trening ssania" className={style.StandardInput} options={["Tak", "Nie"]} onChange={SetFormInputHandler} defaultOption={formInputs.suckTraining} readonly={isReadonly} />

                <LabelInput controlId='babyFatten' label='Dokarmianie (czym? jak? ile?)' className={style.FullInput} onInput={SetFormInputHandler} value={formInputs.babyFatten} readonly={isReadonly} />

                <TextArea controlId='otherRecommendation' label="Inne" className={style.FullInput} onChange={SetFormInputHandler} defaultValue={formInputs.otherRecommendation} readonly={isReadonly} />

            </span>
    </section>
    )
}

export default PatientRecommendationSection;