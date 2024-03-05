import LabelInput from "../../../../../utility/LabelInput";
import SelectInput from "../../../../../utility/SelectInput";

import style from '../css/PatientDocumentationSections.module.css'


const BabyAdditionalFeeding = ({SetFormInputHandler,formInputs,readlOnlyMode}) => {

    const isReadonly = readlOnlyMode;

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
                                <LabelInput controlId='PatientFeedingCountPerDay_DAY1' className={style.FullInput} onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.PatientFeedingCountPerDay_DAY1} />
                            </td>
                            <td>
                                <LabelInput controlId='PatientFeedingCountPerDay_DAY2' className={style.FullInput} onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.PatientFeedingCountPerDay_DAY2} />
                            </td>
                            <td>
                                <LabelInput controlId='PatientFeedingCountPerDay_DAY3' className={style.FullInput} onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.PatientFeedingCountPerDay_DAY3} />
                            </td>
                        </tr>
                        <tr>
                            <td>Mieszanka</td>
                            <td>
                                <LabelInput controlId='PatientFeedingMIXCountPerDay_DAY1' className={style.FullInput} onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.PatientFeedingMIXCountPerDay_DAY1} />
                            </td>
                            <td>
                                <LabelInput controlId='PatientFeedingMIXCountPerDay_DAY2' className={style.FullInput} onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.PatientFeedingMIXCountPerDay_DAY2} />
                            </td>
                            <td>
                                <LabelInput controlId='PatientFeedingMIXCountPerDay_DAY3' className={style.FullInput} onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.PatientFeedingMIXCountPerDay_DAY3} />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <LabelInput controlId='PatientFeedingWay' label='Sposób dokarmiania' className={style.FullInput} required onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.PatientFeedingWay} />

                <SelectInput controlId='PatientExpressingBreastMilk' label="Odciąganie pokarmu" className={style.FullInput} options={["Nie", "Tak"]} onChange={SetFormInputHandler} defaultOption={formInputs.PatientExpressingBreastMilk} readonly={isReadonly} />

                {
                    formInputs.PatientExpressingBreastMilk === 'Tak' && <LabelInput controlId='PatientExpressingBreastMilkHowManyYesterday' label='Ile wczoraj ?' className={style.FullInput} onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.PatientExpressingBreastMilkHowManyYesterday} />
                }
            </span>
        </section>
    )
}

export default BabyAdditionalFeeding;