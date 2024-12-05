//Components
import Canvas from "@components/utility/Canvas";
import LabelInput from "@components/utility/LabelInput";
import SelectInput from "@components/utility/SelectInput";
import TextArea from "@components/utility/TextArea";
//Style
import style from '../css/PatientDocumentationSections.module.css'

/**
 * PatientBreastExaminationSection - component to display breast examination section
 * 
 * Parent component: NextDocumentation
 */

const PatientBreastExaminationSection = ({SetFormInputHandler,formInputs,readOnlyMode}) => {

    const isReadonly = readOnlyMode;

    return (
        <section className={style.PatientFormSection}>
            <h6>Badanie piersi / wywiad/ obserwacja</h6>
            <hr />
            <span>
                <SelectInput controlId='patientBreastGrowingDuringPregnacy' label="Wzrost piersi w ciąży" className={style.FullInput} options={["Tak", "Nie"]} onChange={SetFormInputHandler} defaultOption={formInputs.patientBreastGrowingDuringPregnacy} readonly={isReadonly} related={{controlId:["patientBreastGrowingDuringPregnacy_DAY"],resetValue:["Nie"]}} />
                
                {
                    formInputs.patientBreastGrowingDuringPregnacy === 'Tak' && <LabelInput controlId='patientBreastGrowingDuringPregnacy_DAY' label='W której dobie' className={style.FullInput} onInput={SetFormInputHandler} value={formInputs.patientBreastGrowingDuringPregnacy_DAY} readonly={isReadonly} />
                } 
                
                <SelectInput controlId='patientMilkRush' label="Nawał mleczny" className={style.FullInput} options={["Tak", "Nie"]} onChange={SetFormInputHandler} defaultOption={formInputs.patientMilkRush} readonly={isReadonly} />

                <SelectInput controlId='patientBreastSize' label="Rozmiar piersi" className={style.FullInput} options={["Mała", "Średnia", "Duża"]} onChange={SetFormInputHandler} defaultOption={formInputs.patientBreastSize} readonly={isReadonly} />

                <SelectInput controlId='patientBreastChanges' label="Pierś - zmiany" className={style.FullInput} options={["Nie", "Tak"]} onChange={SetFormInputHandler} defaultOption={formInputs.patientBreastChanges} readonly={isReadonly}
                related={{controlId:["patientBreastChanges_WHAT"],resetValue:["Nie"]}} />
                {
                    formInputs.patientBreastChanges === 'Tak' && <LabelInput controlId='patientBreastChanges_WHAT' label='Jakie zmiany ?' className={style.FullInput} onInput={SetFormInputHandler} value={formInputs.patientBreastChanges_WHAT}  readonly={isReadonly} />
                }



                <span className={style.BreastChangesImage}>
                    {/* <span className={style.Overlay}>
                        <h4>Zaznacz zmiany na rysunku</h4>
                        <button>Edytuj rysunek</button>
                    </span> */}
                    <Canvas className={style.FullInput}/>
                </span>

                <SelectInput controlId='patientBreastNipple' label="Brodawka - aby wybrac wiele opcji przytrzymaj CTRL" className={style.FullInput} multiple options={["Prawidłowa", "Duża", "Długa","Płaska", "Szeroka", "Wklęsła","Mała"]} defaultOption={formInputs.patientBreastNipple} onChange={SetFormInputHandler} readonly={isReadonly} required />

                <LabelInput controlId='patientBreastNippleAfterFeeding' label='Po karmieniu' className={style.FullInput} required onInput={SetFormInputHandler} value={formInputs.patientBreastNippleAfterFeeding} readonly={isReadonly} />

                <SelectInput controlId='patientBreastNippleChanges' label="Brodawki zmianny" className={style.FullInput} options={["Nie", "Tak"]} onChange={SetFormInputHandler} defaultOption={formInputs.patientBreastNippleChanges} readonly={isReadonly} related={{controlId:["patientBreastNippleChanges_WHAT"],resetValue:["Nie"]}} />
                    
                {
                    formInputs.patientBreastNippleChanges == 'Tak' && <LabelInput controlId='patientBreastNippleChanges_WHAT' label='Jakie zmiany ?' className={style.FullInput} onInput={SetFormInputHandler} value={formInputs.patientBreastNippleChanges_WHAT} readonly={isReadonly} />
                }

                <LabelInput controlId='patientMentalState' label='Stan emocjonalny matki' className={style.FullInput} required onInput={SetFormInputHandler} value={formInputs.patientMentalState} readonly={isReadonly} />

                <TextArea controlId='researchObservationBabyBehaviour' label="Badnie/Obserwacja/Zachowanie dziecka" className={style.FullInput} onChange={SetFormInputHandler} required defaultValue={formInputs.researchObservationBabyBehaviour} readonly={isReadonly}  />

            </span>
        </section>
    )
}

export default PatientBreastExaminationSection;