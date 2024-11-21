//Components
import LabelInput from '../../../../../utility/LabelInput'
import SelectInput from '../../../../../utility/SelectInput'
//Style
import style from '../css/PatientDocumentationSections.module.css'

/**
 * BabyDetailsSection - component to display baby details information
 * 
 * Parent component: NextDocumentation
 */

const BabyDetailsSection = ({SetFormInputHandler,formInputs,readOnlyMode}) => {

    const isReadonly = readOnlyMode;
    return (
        <section className={style.PatientFormSection}>
            <h6>Dane dziecka</h6>
            <hr />
            <span>
                <LabelInput controlId='babyFirstName' label='Imie' className={style.StandardInput} required onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.babyFirstName} />

                <LabelInput controlId='babyAge' label='Wiek' className={style.StandardInput} required onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.babyAge} />

                <LabelInput controlId='babyBirthDay' label='Data urodzenia dziecka' className={style.FullInput} inputType='date' required onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.babyBirthDay} />

                <LabelInput controlId='babyBirthPlace' label='Miejsce urodzenia (szpital)' className={style.FullInput} required onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.babyBirthPlace} />

                <LabelInput controlId='babyApgarScore' label='Apgar' className={style.StandardInput} required maxLenght={2} onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.babyApgarScore} />

                <SelectInput controlId='babyBirthTime' label="Urodzone" className={style.StandardInput} options={["O czasie", "Wcześniej", "Później"]} onChange={SetFormInputHandler} readonly={isReadonly} defaultOption={formInputs.babyBirthTime} related={{controlId:["babyBirthTime_ADDITIONAL"],resetValue:["O czasie"]}} />
                {
                    ['Wcześniej','Później'].includes(formInputs.babyBirthTime) && <LabelInput controlId='babyBirthTime_ADDITIONAL' label='O ile' className={style.FullInput} onInput={SetFormInputHandler} value={formInputs.babyBirthTime_ADDITIONAL} readonly={isReadonly} />
                }

                <SelectInput controlId='babyBirthType' label="Poród" className={style.FullInput} options={["Naturalny", "Zabiegowy", "Cięcie cesarskie"]} onChange={SetFormInputHandler} readonly={isReadonly} defaultOption={formInputs.babyBirthType}
                related={{controlId:["babyBirthTypeReason"],resetValue:["Naturalny"]}} />
                
                {
                    ['Zabiegowy','Cięcie cesarskie'].includes(formInputs.babyBirthType) && <LabelInput controlId='babyBirthTypeReason' label='Powód takiego porodu' className={style.FullInput} onInput={SetFormInputHandler} value={formInputs.babyBirthTypeReason} readonly={isReadonly} />
                }

                <LabelInput controlId='babyBirthMedicine' label='Leki podczas porodu' className={style.FullInput} required onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.babyBirthMedicine} />

            </span>
        </section>
    )
}

export default BabyDetailsSection