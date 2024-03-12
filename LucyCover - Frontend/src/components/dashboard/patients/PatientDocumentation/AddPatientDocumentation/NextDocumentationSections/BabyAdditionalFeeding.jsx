import LabelInput from "../../../../../utility/LabelInput";
import SelectInput from "../../../../../utility/SelectInput";

import style from '../css/AddPatientDocumentation_FORMS.module.css'


const BabyAdditionalFeeding = ({SetFormInputHandler,formInputs}) => {
    return (
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
                <SelectInput controlId='PatientExpressingBreastMilk' label="Odciąganie pokarmu" className={style.FullInput} options={["Nie", "Tak"]} 
                                onChange={SetFormInputHandler} defaultOption={formInputs.PatientExpressingBreastMilk.value} />

                {
                    formInputs.PatientExpressingBreastMilk.value === 'Tak' && <LabelInput controlId='PatientExpressingBreastMilkHowManyYesterday' label='Ile wczoraj ?' 
                                                                                                        className={style.FullInput} onInput={SetFormInputHandler}/>
                }
            </span>
        </section>
    )
}

export default BabyAdditionalFeeding;