import LabelInput from "../../../../../utility/LabelInput";
import SelectInput from "../../../../../utility/SelectInput";

import style from '../css/PatientDocumentationSections.module.css'

const BabyFeedingSection = ({SetFormInputHandler,formInputs,readlOnlyMode}) => {

    const isReadonly = readlOnlyMode;
    return (
        <section className={style.PatientFormSection}>
            <h6>Karmienie obecnie</h6>
            <hr />
            <span>
                <LabelInput controlId='PatientFeedingCountPerDay' label='Liczba karmień na dobe' className={style.FullInput} required onInput={SetFormInputHandler} value={formInputs.PatientFeedingCountPerDay} readonly={isReadonly} />

                <LabelInput controlId='PatientFeedingBreastNumber' label='Z ilu piersi' className={style.FullInput} required onInput={SetFormInputHandler} value={formInputs.PatientFeedingBreastNumber} readonly={isReadonly} />

                <SelectInput controlId='PatientFeedingInNight' label="Czy w tym karmienia nocne" className={style.StandardInput} options={["Tak", "Nie"]} onChange={SetFormInputHandler} defaultOption={formInputs.PatientFeedingInNight.value} value={formInputs.PatientFeedingInNight}  readonly={isReadonly} />

                <LabelInput controlId='PatientFeedingHowMuchTime' label='Jak długo trwa jedno karmienie' className={style.StandardInput} required onInput={SetFormInputHandler} value={formInputs.PatientFeedingInNight} readonly={isReadonly} />

                <SelectInput controlId='PatientBreastFeedingWithHood' label="Czy również karmienie z Kapturkiem" className={style.FullInput} options={["Nie", "Tak"]} onChange={SetFormInputHandler} defaultOption={formInputs.PatientBreastFeedingWithHood} readonly={isReadonly} />

                {
                    formInputs.PatientBreastFeedingWithHood === 'Tak' &&  <LabelInput controlId='PatientBreastFeedingWithHood_HowLong' label='Jak długo trwa jedno karmienie' className={style.FullInput} onInput={SetFormInputHandler} value={formInputs.PatientBreastFeedingWithHood_HowLong} readonly={isReadonly} />
                }

                <SelectInput controlId='PatientBreastFeedingAsNeeded' label="Karmienie według potrzeb" className={style.FullInput} options={["Nie", "Tak"]} onChange={SetFormInputHandler} defaultOption={formInputs.PatientBreastFeedingAsNeeded} readonly={isReadonly} />
                
                {
                    formInputs.PatientBreastFeedingAsNeeded === 'Tak' && <LabelInput controlId='PatientBreastFeedingAsNeeded_How' label='Jak wygląda to karmienie' className={style.FullInput} onInput={SetFormInputHandler} value={formInputs.PatientBreastFeedingAsNeeded_How} readonly={isReadonly} />
                } 

            </span>
        </section>
    )
}

export default BabyFeedingSection;