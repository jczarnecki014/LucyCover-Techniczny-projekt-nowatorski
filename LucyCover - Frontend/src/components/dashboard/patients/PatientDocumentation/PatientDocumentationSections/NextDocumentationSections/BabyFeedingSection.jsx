//Components
import LabelInput from "@components/utility/LabelInput";
import SelectInput from "@components/utility/SelectInput";
//Style
import style from '../css/PatientDocumentationSections.module.css'

/**
 * BabyFeedingSection - component to display baby feeding information
 * 
 * Parent component: NextDocumentation
 */

const BabyFeedingSection = ({SetFormInputHandler,formInputs,readOnlyMode}) => {
    const isReadonly = readOnlyMode;

    return (
        <section className={style.PatientFormSection}>
            <h6>Karmienie obecnie</h6>
            <hr />
            <span>
                <LabelInput controlId='patientFeedingCountPerDay' label='Liczba karmień na dobe' className={style.FullInput} required onInput={SetFormInputHandler} value={formInputs.patientFeedingCountPerDay} readonly={isReadonly} />

                <LabelInput controlId='patientFeedingBreastNumber' label='Z ilu piersi' className={style.FullInput} required onInput={SetFormInputHandler} value={formInputs.patientFeedingBreastNumber} readonly={isReadonly} />

                <SelectInput controlId='patientFeedingInNight' label="Czy w tym karmienia nocne" className={style.StandardInput} options={["Tak", "Nie"]} onChange={SetFormInputHandler} defaultOption={formInputs.patientFeedingInNight} value={formInputs.patientFeedingInNight} readonly={isReadonly} />

                <LabelInput controlId='patientFeedingHowMuchTime' label='Ile trwa jedno karmienie' className={style.StandardInput} required onInput={SetFormInputHandler} value={formInputs.patientFeedingHowMuchTime} readonly={isReadonly} />

                <SelectInput controlId='patientBreastFeedingWithHood' label="Czy również karmienie z Kapturkiem" className={style.FullInput} options={["Nie", "Tak"]} onChange={SetFormInputHandler} defaultOption={formInputs.patientBreastFeedingWithHood} readonly={isReadonly} related={{controlId:["patientBreastFeedingWithHood_HowLong"],resetValue:["Nie"]}} />

                {
                    formInputs.patientBreastFeedingWithHood === 'Tak' &&  <LabelInput controlId='patientBreastFeedingWithHood_HowLong' label='Jak długo trwa jedno karmienie' className={style.FullInput} onInput={SetFormInputHandler} value={formInputs.patientBreastFeedingWithHood_HowLong} readonly={isReadonly} />
                }

                <SelectInput controlId='patientBreastFeedingAsNeeded' label="Karmienie według potrzeb" className={style.FullInput} options={["Nie", "Tak"]} onChange={SetFormInputHandler} defaultOption={formInputs.patientBreastFeedingAsNeeded} readonly={isReadonly} related={{controlId:["patientBreastFeedingAsNeeded_How"],resetValue:["Nie"]}} />
                
                {
                    formInputs.patientBreastFeedingAsNeeded === 'Tak' && <LabelInput controlId='patientBreastFeedingAsNeeded_How' label='Jak wygląda to karmienie' className={style.FullInput} onInput={SetFormInputHandler} value={formInputs.patientBreastFeedingAsNeeded_How} readonly={isReadonly} />
                } 

            </span>
        </section>
    )
}

export default BabyFeedingSection;