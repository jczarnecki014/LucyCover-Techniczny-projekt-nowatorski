import Canvas from "../../../../../utility/Canvas";
import LabelInput from "../../../../../utility/LabelInput";
import SelectInput from "../../../../../utility/SelectInput";
import TextArea from "../../../../../utility/TextArea";

import image from '../../../../../../assets/images/breast.png'

import style from '../css/PatientDocumentationSections.module.css'


const PatientBreastExaminationSection = ({SetFormInputHandler,formInputs,readlOnlyMode}) => {

    const isReadonly = readlOnlyMode;

    return (
        <section className={style.PatientFormSection}>
            <h6>Badanie piersi / wywiad/ obserwacja</h6>
            <hr />
            <span>
                <SelectInput controlId='PatientBreastGrowingDuringPregnacy' label="Wzrost piersi w ciąży" className={style.StandardInput} options={["Tak", "Nie"]} onChange={SetFormInputHandler} defaultOption={formInputs.PatientBreastGrowingDuringPregnacy} readonly={isReadonly} />
                
                {
                    formInputs.PatientBreastGrowingDuringPregnacy === 'Tak' && <LabelInput controlId='PatientBreastGrowingDuringPregnacy_DAY' label='W której dobie' className={style.StandardInput} onInput={SetFormInputHandler} value={formInputs.PatientBreastGrowingDuringPregnacy_DAY} readonly={isReadonly} />
                } 
                
                <SelectInput controlId='PatientMilkRush' label="Nawał mleczny" className={style.StandardInput} options={["Tak", "Nie"]} onChange={SetFormInputHandler} defaultOption={formInputs.PatientMilkRush} readonly={isReadonly} />

                <SelectInput controlId='PatientBreastSize' label="Rozmiar piersi" className={style.FullInput} options={["Mała", "Średnia", "Duża"]} onChange={SetFormInputHandler} defaultOption={formInputs.PatientBreastSize} readonly={isReadonly} />

                <SelectInput controlId='PatientBreastChanges' label="Pierś - zmiany" className={style.FullInput} options={["Nie", "Tak"]} onChange={SetFormInputHandler} defaultOption={formInputs.PatientBreastChanges} readonly={isReadonly} />
                    
                {
                    formInputs.PatientBreastChanges === 'Tak' && <LabelInput controlId='PatientBreastChanges_WHAT' label='Jakie zmiany ?' className={style.FullInput} onInput={SetFormInputHandler} value={formInputs.PatientBreastChanges_WHAT}  readonly={isReadonly} />
                }



                <span className={style.BreastChangesImage}>
                    {/* <span className={style.Overlay}>
                        <h4>Zaznacz zmiany na rysunku</h4>
                        <button>Edytuj rysunek</button>
                    </span> */}
                    <Canvas className={style.FullInput}/>
                </span>

                <SelectInput controlId='PatientBreastNipple' label="Brodawka - aby wybrac wiele opcji przytrzymaj CTRL" className={style.FullInput} multiple options={["Prawidłowa", "Duża", "Długa","Płaska", "Szeroka", "Wklęsła","Mała"]} defaultOption={formInputs.PatientBreastNipple} onChange={SetFormInputHandler} readonly={isReadonly} />

                <LabelInput controlId='PatientBreastNippleAfterFeeding' label='Po karmieniu' className={style.FullInput} required onInput={SetFormInputHandler} value={formInputs.PatientBreastNippleAfterFeeding} readonly={isReadonly} />

                <SelectInput controlId='PatientBreastNippleChanges' label="Brodawki zmianny" className={style.FullInput} options={["Nie", "Tak"]} onChange={SetFormInputHandler} defaultOption={formInputs.PatientBreastNippleChanges} readonly={isReadonly} />
                    
                {
                    formInputs.PatientBreastNippleChanges.value == 'Tak' && <LabelInput controlId='PatientBreastNippleChanges_WHAT' label='Jakie zmiany ?' className={style.FullInput} onInput={SetFormInputHandler} value={formInputs.PatientBreastNippleChanges_WHAT} readonly={isReadonly} />
                }

                <LabelInput controlId='PatientMentalState' label='Stan emocjonalny matki' className={style.FullInput} required onInput={SetFormInputHandler} value={formInputs.PatientMentalState} readonly={isReadonly} />

                <TextArea controlId='ResearchObservationBabyBehaviour' label="Badnie/Obserwacja/Zachowanie dziecka" className={style.FullInput} onChange={SetFormInputHandler} required defaultValue={formInputs.ResearchObservationBabyBehaviour} readonly={isReadonly}  />

            </span>
        </section>
    )
}

export default PatientBreastExaminationSection;