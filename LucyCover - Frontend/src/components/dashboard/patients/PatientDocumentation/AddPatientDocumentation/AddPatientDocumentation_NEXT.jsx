import { useSelector, useDispatch } from "react-redux"

import { SetInput } from "../../../../../context/slices/AddNextDocumentationForm"

import OverlayModel from "../../../../utility/OverlayModel"
import LabelInput from "../../../../utility/LabelInput"
import SelectInput from "../../../../utility/SelectInput"
import TextArea from "../../../../utility/TextArea"

import style from './css/AddPatientDocumentation_FORMS.module.css'
import BabyFeedingSection from "./NextDocumentationSections/BabyFeedingSection"

const AddPatientDocumentation_NEXT = () => {

    const dispatch = useDispatch();

    const SetFormInputHandler = ({inputId,inputObject}) => {
        dispatch(SetInput({inputId,inputObject}))
    }

    const form = useSelector(state => state.addNextDocumentationForm)
    console.log(form)

    return (
        <OverlayModel title="Dodaj nową dokumentacje">
            <form className={style.Container}>
                <div className={style.LeftSide}>
                    <BabyFeedingSection SetFormInputHandler={SetFormInputHandler} />

                    <section className={style.PatientFormSection}>
                        <h6>Dokarmianie w ciągu ostatnich 3 dni</h6>
                        <span> 
                            <table>
                                <thead>
                                    <tr>
                                        <th>Pokarm</th>
                                        <th>Dzień 1</th>
                                        <th>Dzień 2</th>
                                        <th>Dzień 3</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Matki</td>
                                        <td>
                                            <LabelInput controlId='PatientFeedingCountPerDay_DAY1' className={style.FullInput} required onInput={SetFormInputHandler} />
                                        </td>
                                        <td>
                                            <LabelInput controlId='PatientFeedingCountPerDay_DAY2' className={style.FullInput} required onInput={SetFormInputHandler} />
                                        </td>
                                        <td>
                                            <LabelInput controlId='PatientFeedingCountPerDay_DAY3' className={style.FullInput} required onInput={SetFormInputHandler} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Mieszanka</td>
                                        <td>
                                            <LabelInput controlId='PatientFeedingMIXCountPerDay_DAY1' className={style.FullInput} required onInput={SetFormInputHandler} />
                                        </td>
                                        <td>
                                            <LabelInput controlId='PatientFeedingMIXCountPerDay_DAY2' className={style.FullInput} required onInput={SetFormInputHandler} />
                                        </td>
                                        <td>
                                            <LabelInput controlId='PatientFeedingMIXCountPerDay_DAY3' className={style.FullInput} required onInput={SetFormInputHandler} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <LabelInput controlId='PatientFeedingWay' label='Sposób dokarmiania' className={style.FullInput} required onInput={SetFormInputHandler} />
                            <SelectInput controlId='PatientExpressingBreastMilk' label="Odciąganie pokarmu" className={style.StandardInput} options={["Tak", "Nie"]} 
                                         onChange={SetFormInputHandler} />

                            {/* Opcjonalnie */}
                            <LabelInput controlId='PatientExpressingBreastMilkHowManyYesterday' label='Ile wczoraj ?' className={style.StandardInput} onInput={SetFormInputHandler}/>
                        </span>
                    </section>

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

                </div>
                <div className={style.RightSide}>
                    <section className={style.PatientFormSection}>
                            <h6>Wydalanie</h6>
                            <hr />
                            <span>
                                <LabelInput controlId='BabyPeeingADay' label='Moczenie w pieluch (na dobe)' className={style.StandardInput} required onInput={SetFormInputHandler} />
                                <LabelInput controlId='BabyExcretionADay' label='Oddawanie stolca (na dobe)' className={style.StandardInput} required onInput={SetFormInputHandler} />
                                <SelectInput controlId='BabyColic' label="Objawy kolki" className={style.StandardInput} options={["Tak", "Nie"]} 
                                         onChange={SetFormInputHandler} />

                                {/* Opcjonalnie */}
                                <LabelInput controlId='BabyColicSinceWhen' label='Od kiedy ? (kolka)' className={style.StandardInput} onInput={SetFormInputHandler}/>

                                <SelectInput controlId='BabyNipple' label="Smoczek uspokajaczek" className={style.StandardInput} options={["Tak", "Nie"]} 
                                         onChange={SetFormInputHandler} />

                                {/* Opcjonalnie */}
                                <LabelInput controlId='BabyNippleSinceWhen' label='Od kiedy ? (smoczek)' className={style.StandardInput} onInput={SetFormInputHandler}/>
                            </span>
                    </section>

                    <section className={style.PatientFormSection}>
                            <h6>Stosowane leki/ użwyki/ antykoncepcja</h6>
                            <hr />
                            <span>
                                <LabelInput controlId='PatientMedicationsUsed' label='Matka' className={style.StandardInput} required onInput={SetFormInputHandler} />
                                <LabelInput controlId='BabyMedicationsUsed' label='Dziecko' className={style.StandardInput} required onInput={SetFormInputHandler} />
                                <SelectInput controlId='PatientPeriodAfterDelivery' label="Miesiączka po porodzie" className={style.StandardInput} options={["Nie", "Tak"]} 
                                         onChange={SetFormInputHandler} />

                                {/* Opcjonalnie */}
                                <LabelInput controlId='PatientPeriodAfterDelivery_WHEN' label='Kiedy' className={style.StandardInput} onInput={SetFormInputHandler}/>
                            </span>
                    </section>

                    <section className={style.PatientFormSection}>
                            <h6>Zalecenia</h6>
                            <hr />
                            <span>
                                <SelectInput controlId='PostureCorection' label="Korekta pozycji" className={style.StandardInput} options={["Tak", "Nie"]} 
                                             onChange={SetFormInputHandler} />

                                <SelectInput controlId='SuckTraining' label="Trening ssania" className={style.StandardInput} options={["Tak", "Nie"]} 
                                             onChange={SetFormInputHandler} />

                                <LabelInput controlId='BabyFatten' label='Dokarmianie (czym? jak? ile?)' className={style.FullInput} onInput={SetFormInputHandler}/>

                                <TextArea controlId='OtherRecommendation' label="Inne" className={style.FullInput} onChange={SetFormInputHandler}/>

                            </span>
                    </section>

                </div>
            </form>
        </OverlayModel>
    )
}

export default AddPatientDocumentation_NEXT