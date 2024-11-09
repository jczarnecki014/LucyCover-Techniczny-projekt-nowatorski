//Components
import LabelInput from "../../../../../utility/LabelInput";
import SelectInput from "../../../../../utility/SelectInput";
//Style
import style from '../css/PatientDocumentationSections.module.css'

/**
 * BabyAdditionalFeeding - component to display baby feeding information
 * 
 * Parent component: NextDocumentation
 */

const BabyAdditionalFeeding = ({SetFormInputHandler,formInputs,readOnlyMode}) => {
    const isReadonly = readOnlyMode;

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
                                <LabelInput controlId='patientFeedingCountPerDay_DAY1' className={style.FullInput} onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.patientFeedingCountPerDay_DAY1} required maxLenght={2} />
                            </td>
                            <td>
                                <LabelInput controlId='patientFeedingCountPerDay_DAY2' className={style.FullInput} onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.patientFeedingCountPerDay_DAY2} required maxLenght={2} />
                            </td>
                            <td>
                                <LabelInput controlId='patientFeedingCountPerDay_DAY3' className={style.FullInput} onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.patientFeedingCountPerDay_DAY3} required maxLenght={2} />
                            </td>
                        </tr>
                        <tr>
                            <td>Mieszanka</td>
                            <td>
                                <LabelInput controlId='patientFeedingMIXCountPerDay_DAY1' className={style.FullInput} onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.patientFeedingMIXCountPerDay_DAY1} required maxLenght={2} />
                            </td>
                            <td>
                                <LabelInput controlId='patientFeedingMIXCountPerDay_DAY2' className={style.FullInput} onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.patientFeedingMIXCountPerDay_DAY2} required maxLenght={2} />
                            </td>
                            <td>
                                <LabelInput controlId='patientFeedingMIXCountPerDay_DAY3' className={style.FullInput} onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.patientFeedingMIXCountPerDay_DAY3} required maxLenght={2} />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <LabelInput controlId='patientFeedingWay' label='Sposób dokarmiania' className={style.FullInput} required onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.patientFeedingWay} />

                <SelectInput controlId='patientExpressingBreastMilk' label="Odciąganie pokarmu" className={style.FullInput} options={["Nie", "Tak"]} onChange={SetFormInputHandler} defaultOption={formInputs.patientExpressingBreastMilk} readonly={isReadonly} />

                {
                    formInputs.patientExpressingBreastMilk === 'Tak' && <LabelInput controlId='patientExpressingBreastMilkHowManyYesterday' label='Ile wczoraj ?' className={style.FullInput} onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.patientExpressingBreastMilkHowManyYesterday} />
                }
            </span>
        </section>
    )
}

export default BabyAdditionalFeeding;