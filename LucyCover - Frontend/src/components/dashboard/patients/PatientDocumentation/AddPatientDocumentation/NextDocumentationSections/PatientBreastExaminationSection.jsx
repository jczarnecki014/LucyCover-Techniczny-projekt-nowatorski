import LabelInput from "../../../../../utility/LabelInput";
import SelectInput from "../../../../../utility/SelectInput";
import TextArea from "../../../../../utility/TextArea";

import style from '../css/AddPatientDocumentation_FORMS.module.css'


const PatientBreastExaminationSection = ({SetFormInputHandler,formInputs}) => {
    return (
        <section className={style.PatientFormSection}>
                        <h6>Badanie piersi / wywiad/ obserwacja</h6>
                        <hr />
                        <span>
                           <SelectInput controlId='PatientBreastGrowingDuringPregnacy' label="Wzrost piersi w ciąży" className={style.StandardInput} options={["Tak", "Nie"]} 
                                         onChange={SetFormInputHandler} defaultOption={formInputs.PatientBreastGrowingDuringPregnacy.value} />
                            
                            {
                                formInputs.PatientBreastGrowingDuringPregnacy.value === 'Tak' && <LabelInput controlId='PatientBreastGrowingDuringPregnacy_DAY' label='W której dobie' 
                                                                                                             className={style.StandardInput} onInput={SetFormInputHandler} />
                            } 
                           
                           <SelectInput controlId='PatientMilkRush' label="Nawał mleczny" className={style.StandardInput} options={["Tak", "Nie"]} 
                                         onChange={SetFormInputHandler} defaultOption={formInputs.PatientMilkRush.value} />

                            <SelectInput controlId='PatientBreastSize' label="Rozmiar piersi" className={style.StandardInput} options={["Mała", "Średnia", "Duża"]} 
                                         onChange={SetFormInputHandler} defaultOption={formInputs.PatientBreastSize.value} />

                            <SelectInput controlId='PatientBreastChanges' label="Pierś - zmiany" className={style.FullInput} options={["Nie", "Tak"]} 
                                         onChange={SetFormInputHandler} defaultOption={formInputs.PatientBreastChanges.value} />
                                
                            {
                                formInputs.PatientBreastChanges.value === 'Tak' && <LabelInput controlId='PatientBreastChanges_WHAT' label='Jakie zmiany ?' 
                                                                                               className={style.FullInput} onInput={SetFormInputHandler} />
                            }



                            <span className={style.BreastChangesImage}>
                                <span className={style.Overlay}>
                                    <h4>Zaznacz zmiany na rysunku</h4>
                                    <button>Edytuj rysunek</button>
                                </span>
                            </span>

                            <SelectInput controlId='PatientBreastNipple' label="Brodawka - aby wybrac wiele opcji przytrzymaj CTRL" className={style.FullInput} multiple
                                         options={["Prawidłowa", "Duża", "Długa","Płaska", "Szeroka", "Wklęsła","Mała"]} defaultOption={formInputs.PatientBreastNipple.value} 
                                         onChange={SetFormInputHandler} />

                            <LabelInput controlId='PatientBreastNippleAfterFeeding' label='Po karmieniu' className={style.FullInput} required onInput={SetFormInputHandler} />

                            <SelectInput controlId='PatientBreastNippleChanges' label="Brodawki zmianny" className={style.FullInput} options={["Nie", "Tak"]} 
                                         onChange={SetFormInputHandler} defaultOption={formInputs.PatientBreastNippleChanges.value} />
                                
                            {
                                formInputs.PatientBreastNippleChanges.value == 'Tak' && <LabelInput controlId='PatientBreastNippleChanges_WHAT' label='Jakie zmiany ?' 
                                                                                                    className={style.FullInput} onInput={SetFormInputHandler} />
                            }

                            <LabelInput controlId='PatientMentalState' label='Stan emocjonalny matki' className={style.FullInput} required onInput={SetFormInputHandler} />

                            <TextArea controlId='ResearchObservationBabyBehaviour' label="Badnie/Obserwacja/Zachowanie dziecka" className={style.FullInput} 
                                    onChange={SetFormInputHandler}/>

                        </span>
                    </section>
    )
}

export default PatientBreastExaminationSection;