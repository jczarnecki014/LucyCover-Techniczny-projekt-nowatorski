import OverlayModel from "../../../../utility/OverlayModel"
import LabelInput from "../../../../utility/LabelInput"
import SelectInput from "../../../../utility/SelectInput"

import style from './css/AddPatientDocumentation_FORMS.module.css'

const AddPatientDocumentation_NEXT = () => {

    const SetFormInputHandler = ({inputId,inputObject}) => {
        dispatch(SetInput({inputId,inputObject}))
    }

    return (
        <OverlayModel title="Dodaj nową dokumentacje">
            <form className={style.Container}>
                <div className={style.LeftSide}>
                    <section className={style.PatientFormSection}>
                        <h6>Karmienie obecnie</h6>
                        <hr />
                        <span>
                            <LabelInput controlId='PatientFeedingCountPerDay' label='Liczba karmień na dobe' className={style.FullInput} required onInput={SetFormInputHandler} />
                            <LabelInput controlId='PatientFeedingBreastNumber' label='Z ilu piersi' className={style.FullInput} required onInput={SetFormInputHandler} />
                            <SelectInput controlId='PatientFeedingInNight' label="W tym karmienia nocne" className={style.StandardInput} options={["Tak", "Nie"]} 
                                         onChange={SetFormInputHandler} />
                            <LabelInput controlId='PatientFeedingHowMuchTime' label='Jak długo trwa jedno karmienie' className={style.StandardInput} required onInput={SetFormInputHandler} />
                            <SelectInput controlId='PatientFeedingInNight' label="W tym karmienia nocne" className={style.FullInput} options={["Tak", "Nie"]} 
                                         onChange={SetFormInputHandler} />
                            <SelectInput controlId='PatientBreastFeedingWithHood' label="Karmienie z Kapturkiem" className={style.StandardInput} options={["Tak", "Nie"]} 
                                         onChange={SetFormInputHandler} />

                            {/* Opcjonalnie */}
                           <LabelInput controlId='PatientBreastFeedingWithHood_HowLong' label='Jak długo trwa jedno karmienie' className={style.StandardInput} required onInput={SetFormInputHandler} />

                           <SelectInput controlId='PatientBreastFeedingAsNeeded' label="Karmienie według potrzeb" className={style.StandardInput} options={["Tak", "Nie"]} 
                                         onChange={SetFormInputHandler} />

                            {/* Opcjonalnie */}
                           <LabelInput controlId='PatientBreastFeedingAsNeeded_How' label='Jak wygląda to karmienie' className={style.StandardInput} required onInput={SetFormInputHandler} /> 

                        </span>
                    </section>

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
                                            <LabelInput controlId='PatientFeedingCountPerDay' className={style.FullInput} required onInput={SetFormInputHandler} />
                                        </td>
                                        <td>
                                            <LabelInput controlId='PatientFeedingCountPerDay' className={style.FullInput} required onInput={SetFormInputHandler} />
                                        </td>
                                        <td>
                                            <LabelInput controlId='PatientFeedingCountPerDay' className={style.FullInput} required onInput={SetFormInputHandler} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Mieszanka</td>
                                        <td>
                                            <LabelInput controlId='PatientFeedingCountPerDay' className={style.FullInput} required onInput={SetFormInputHandler} />
                                        </td>
                                        <td>
                                            <LabelInput controlId='PatientFeedingCountPerDay' className={style.FullInput} required onInput={SetFormInputHandler} />
                                        </td>
                                        <td>
                                            <LabelInput controlId='PatientFeedingCountPerDay' className={style.FullInput} required onInput={SetFormInputHandler} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </span>
                    </section>

                </div>
                <div className={style.RightSide}>
                    <h1>Right</h1>
                </div>
            </form>
        </OverlayModel>
    )
}

export default AddPatientDocumentation_NEXT