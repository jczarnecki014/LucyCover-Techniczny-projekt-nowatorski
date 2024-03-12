import LabelInput from "../../../../../utility/LabelInput";
import SelectInput from "../../../../../utility/SelectInput";

import style from '../css/AddPatientDocumentation_FORMS.module.css'


const BabyExcretionSection = ({SetFormInputHandler,formInputs}) => {
    return (
        <section className={style.PatientFormSection}>
            <h6>Wydalanie</h6>
            <hr />
            <span>
                <LabelInput controlId='BabyPeeingADay' label='Moczenie w pieluch (na dobe)' className={style.StandardInput} onInput={SetFormInputHandler} />
                <LabelInput controlId='BabyExcretionADay' label='Oddawanie stolca (na dobe)' className={style.StandardInput} onInput={SetFormInputHandler} />
                <SelectInput controlId='BabyColic' label="Objawy kolki" className={style.StandardInput} options={["Nie", "Tak"]} 
                            onChange={SetFormInputHandler} defaultOption={formInputs.BabyColic.value} />

                {
                    formInputs.BabyColic.value === 'Tak' && <LabelInput controlId='BabyColicSinceWhen' label='Od kiedy ? (kolka)' className={style.StandardInput} 
                                                                        onInput={SetFormInputHandler}/>
                }

                <SelectInput controlId='BabyNipple' label="Smoczek uspokajaczek" className={style.StandardInput} options={["Nie", "Tak"]} 
                            onChange={SetFormInputHandler} defaultOption={formInputs.BabyNipple.value} />

                {
                    formInputs.BabyNipple.value === 'Tak' && <LabelInput controlId='BabyNippleSinceWhen' label='Od kiedy ? (smoczek)' className={style.FullInput} 
                                                                         onInput={SetFormInputHandler}/>
                }
            </span>
    </section>
    )
}

export default BabyExcretionSection;