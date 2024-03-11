import LabelInput from "../../../../../utility/LabelInput";
import SelectInput from "../../../../../utility/SelectInput";

import style from '../css/AddPatientDocumentation_FORMS.module.css'

const BabyFeedingSection = ({SetFormInputHandler,formInputs}) => {
    console.log(formInputs.PatientBreastFeedingWithHood.value)
    return (
        <section className={style.PatientFormSection}>
            <h6>Karmienie obecnie</h6>
            <hr />
            <span>
                <LabelInput controlId='PatientFeedingCountPerDay' label='Liczba karmień na dobe' className={style.FullInput} required onInput={SetFormInputHandler} />
                <LabelInput controlId='PatientFeedingBreastNumber' label='Z ilu piersi' className={style.FullInput} required onInput={SetFormInputHandler} />
                <SelectInput controlId='PatientFeedingInNight' label="W tym karmienia nocne" className={style.StandardInput} options={["Tak", "Nie"]} 
                                onChange={SetFormInputHandler} />
                <LabelInput controlId='PatientFeedingHowMuchTime' label='Jak długo trwa jedno karmienie' className={style.StandardInput} required onInput={SetFormInputHandler} />
                <SelectInput controlId='PatientBreastFeedingWithHood' label="Karmienie z Kapturkiem" className={style.StandardInput} options={["Nie", "Tak"]} 
                                onChange={SetFormInputHandler} />

                {
                    formInputs.PatientBreastFeedingWithHood.value === 'Tak' &&  <LabelInput controlId='PatientBreastFeedingWithHood_HowLong' label='Jak długo trwa jedno karmienie' 
                                                                                          className={style.StandardInput} required onInput={SetFormInputHandler} />
                }

                <SelectInput controlId='PatientBreastFeedingAsNeeded' label="Karmienie według potrzeb" className={style.StandardInput} options={["Nie", "Tak"]} 
                                onChange={SetFormInputHandler} />
                
                {
                    formInputs.PatientBreastFeedingAsNeeded.value === 'Tak' && <LabelInput controlId='PatientBreastFeedingAsNeeded_How' label='Jak wygląda to karmienie' 
                                                                                               className={style.FullInput} required onInput={SetFormInputHandler} />
                } 

            </span>
        </section>
    )
}

export default BabyFeedingSection;