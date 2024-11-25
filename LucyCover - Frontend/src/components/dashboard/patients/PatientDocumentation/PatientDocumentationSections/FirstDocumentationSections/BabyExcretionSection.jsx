//Components
import LabelInput from "../../../../../utility/LabelInput";
import SelectInput from "../../../../../utility/SelectInput";
//Style
import style from '../css/PatientDocumentationSections.module.css'

/**
 * BabyExcretionSection - component to display baby exctraction information
 * 
 * Parent component: NextDocumentation
 */

const BabyExcretionSection = ({SetFormInputHandler,formInputs,readOnlyMode}) => {

    const isReadonly = readOnlyMode;

    return (
        <section className={style.PatientFormSection}>
            <h6>Wydalanie</h6>
            <hr />
            <span>
                <LabelInput controlId='babyPeeingADay' label='Moczenie w pieluch (na dobe)' className={style.StandardInput} onInput={SetFormInputHandler} value={formInputs.babyPeeingADay} readonly={isReadonly} required />

                <LabelInput controlId='babyExcretionADay' label='Oddawanie stolca (na dobe)' className={style.StandardInput} onInput={SetFormInputHandler} value={formInputs.babyExcretionADay} readonly={isReadonly} required />

                <SelectInput controlId='babyColic' label="Objawy kolki" className={style.FullInput} options={["Nie", "Tak"]} onChange={SetFormInputHandler} defaultOption={formInputs.babyColic} readonly={isReadonly} related={{controlId:["babyColicSinceWhen"],resetValue:["Nie"]}} />


                {
                    formInputs.babyColic === 'Tak' && <LabelInput controlId='babyColicSinceWhen' label='Od kiedy ? (kolka)' className={style.FullInput} onInput={SetFormInputHandler} value={formInputs.babyColicSinceWhen} readonly={isReadonly} />
                }

                <SelectInput controlId='babyNipple' label="Smoczek uspokajaczek" className={style.FullInput} options={["Nie", "Tak"]} onChange={SetFormInputHandler} defaultOption={formInputs.babyNipple} readonly={isReadonly} related={{controlId:["babyNippleSinceWhen"],resetValue:["Nie"]}} />

                {
                    formInputs.babyNipple === 'Tak' && <LabelInput controlId='babyNippleSinceWhen' label='Od kiedy ? (smoczek)' className={style.FullInput} onInput={SetFormInputHandler} value={formInputs.babyNippleSinceWhen} readonly={isReadonly} />
                }
            </span>
    </section>
    )
}

export default BabyExcretionSection;