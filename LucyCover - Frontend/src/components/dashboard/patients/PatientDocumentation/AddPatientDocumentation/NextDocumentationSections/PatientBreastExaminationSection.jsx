import LabelInput from "../../../../../utility/LabelInput";
import SelectInput from "../../../../../utility/SelectInput";
import TextArea from "../../../../../utility/TextArea";

import style from '../css/AddPatientDocumentation_FORMS.module.css'


const PatientBreastExaminationSection = ({SetFormInputHandler}) => {
    return (
        <section className={style.PatientFormSection}>
                        <h6>Badanie piersi / wywiad/ obserwacja</h6>
                        <hr />
                        <span>
                           <SelectInput controlId='PatientBreastGrowingDuringPregnacy' label="Wzrost piersi w ciąży" className={style.StandardInput} options={["Tak", "Nie"]} 
                                         onChange={SetFormInputHandler} />
                            
                            {/* Opcjonalnie */}
                           <LabelInput controlId='PatientBreastGrowingDuringPregnacy_DAY' label='W której dobie' className={style.StandardInput} onInput={SetFormInputHandler} /> 
                           
                           <SelectInput controlId='PatientMilkRush' label="Nawał mleczny" className={style.StandardInput} options={["Tak", "Nie"]} 
                                         onChange={SetFormInputHandler} />

                            <SelectInput controlId='PatientBreastSize' label="Rozmiar piersi" className={style.StandardInput} options={["Mała", "Średnia", "Duża"]} 
                                         onChange={SetFormInputHandler} />

                            <SelectInput controlId='PatientBreastChanges' label="Pierś - zmiany" className={style.StandardInput} options={["Tak", "Nie"]} 
                                         onChange={SetFormInputHandler} />
                                
                            {/* Opcjonalnie */}
                            <LabelInput controlId='PatientBreastChanges_WHAT' label='Jakie zmiany ?' className={style.StandardInput} onInput={SetFormInputHandler} />


                            <span className={style.BreastChangesImage}>
                                <span className={style.Overlay}>
                                    <h4>Zaznacz zmiany na rysunku</h4>
                                    <button>Edytuj rysunek</button>
                                </span>
                            </span>

                            <SelectInput controlId='PatientBreastNipple' label="Brodawka - aby wybrac wiele opcji przytrzymaj CTRL" className={style.FullInput} multiple
                                         options={["Prawidłowa", "Duża", "Długa","Płaska", "Szeroka", "Wklęsła","Mała"]} defaultOption={['Prawidłowa']} onChange={SetFormInputHandler} />

                            <LabelInput controlId='PatientBreastNippleAfterFeeding' label='Po karmieniu' className={style.FullInput} onInput={SetFormInputHandler} />

                            <SelectInput controlId='PatientBreastNippleChanges' label="Brodawki zmianny" className={style.StandardInput} options={["Tak", "Nie"]} 
                                         onChange={SetFormInputHandler} />
                                
                            {/* Opcjonalnie */}
                            <LabelInput controlId='PatientBreastNippleChanges_WHAT' label='Jakie zmiany ?' className={style.StandardInput} onInput={SetFormInputHandler} />

                            <LabelInput controlId='PatientMentalState' label='Stan emocjonalny matki' className={style.FullInput} onInput={SetFormInputHandler} />

                            <TextArea controlId='ResearchObservationBabyBehaviour' label="Badnie/Obserwacja/Zachowanie dziecka" className={style.FullInput} onChange={SetFormInputHandler}/>

                        </span>
                    </section>
    )
}

export default PatientBreastExaminationSection;