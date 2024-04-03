import LabelInput from "../../../../../utility/LabelInput";
import SelectInput from "../../../../../utility/SelectInput";

import style from '../css/PatientDocumentationSections.module.css'


const BabyExcretionSection = ({SetFormInputHandler,formInputs,readlOnlyMode}) => {

    const isReadonly = readlOnlyMode;

    return (
        <section className={style.PatientFormSection}>
            <h6>Wydalanie</h6>
            <hr />
            <span>
                <LabelInput controlId='BabyPeeingADay' label='Moczenie w pieluch (na dobe)' className={style.StandardInput} onInput={SetFormInputHandler} value={formInputs.BabyPeeingADay} readonly={isReadonly} />

                <LabelInput controlId='BabyExcretionADay' label='Oddawanie stolca (na dobe)' className={style.StandardInput} onInput={SetFormInputHandler} value={formInputs.BabyExcretionADay} readonly={isReadonly} />

                <SelectInput controlId='BabyColic' label="Objawy kolki" className={style.FullInput} options={["Nie", "Tak"]} onChange={SetFormInputHandler} defaultOption={formInputs.BabyColic} readonly={isReadonly} />


                {
                    formInputs.BabyColic === 'Tak' && <LabelInput controlId='BabyColicSinceWhen' label='Od kiedy ? (kolka)' className={style.FullInput} onInput={SetFormInputHandler} value={formInputs.BabyColicSinceWhen} readonly={isReadonly} />
                }

                <SelectInput controlId='BabyNipple' label="Smoczek uspokajaczek" className={style.FullInput} options={["Nie", "Tak"]} onChange={SetFormInputHandler} defaultOption={formInputs.BabyNipple} readonly={isReadonly} />

                {
                    formInputs.BabyNipple === 'Tak' && <LabelInput controlId='BabyNippleSinceWhen' label='Od kiedy ? (smoczek)' className={style.FullInput} onInput={SetFormInputHandler} value={formInputs.BabyNippleSinceWhen} readonly={isReadonly} />
                }
            </span>
    </section>
    )
}

export default BabyExcretionSection;