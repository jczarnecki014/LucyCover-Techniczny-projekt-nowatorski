import style from '../css/PatientDocumentationSections.module.css'

import LabelInput from '../../../../../utility/LabelInput'
import SelectInput from '../../../../../utility/SelectInput'

const BabyDetailsSection = ({SetFormInputHandler,formInputs,displayMode}) => {
    const isReadonly = displayMode;
    return (
        <section className={style.PatientFormSection}>
            <h6>Dane dziecka</h6>
            <hr />
            <span>
                <LabelInput controlId='babyFirstName' label='Imie' className={style.StandardInput} required onInput={SetFormInputHandler} readonly={isReadonly}/>
                <LabelInput controlId='babyAge' label='Wiek' className={style.StandardInput} required onInput={SetFormInputHandler} readonly={isReadonly} />
                <LabelInput controlId='babyBirthDay' label='Data urodzenia dziecka' className={style.FullInput} inputType='date' required onInput={SetFormInputHandler} readonly={isReadonly} />
                <LabelInput controlId='babyBirthPlace' label='Miejsce urodzenia (szpital)' className={style.FullInput} required onInput={SetFormInputHandler}  readonly={isReadonly}/>
                <LabelInput controlId='babyApgarScore' label='Apgar' className={style.StandardInput} required onInput={SetFormInputHandler} readonly={isReadonly}/>

                <SelectInput controlId='babyBirthTime' label="Urodzone" className={style.StandardInput} options={["O czasie", "Wcześniej", "Później"]} onChange={SetFormInputHandler} readonly={isReadonly} />
                {
                    ['Wcześniej','Później'].includes(formInputs.babyBirthTime.value) && <LabelInput controlId='babyBirthTime_ADDITIONAL' label='O ile' className={style.FullInput} onInput={SetFormInputHandler} />
                }

                <SelectInput controlId='babyBirthType' label="Poród" className={style.FullInput} options={["Naturalny", "Zabiegowy", "Cięcie cesarskie"]} onChange={SetFormInputHandler} readonly={isReadonly}/>
                
                {
                    ['Zabiegowy','Cięcie cesarskie'].includes(formInputs.babyBirthType.value) && <LabelInput controlId='babyBirthTypeReason' label='Powód takiego porodu' className={style.FullInput} onInput={SetFormInputHandler} />
                }

                <LabelInput controlId='babyBirthMedicine' label='Leki podczas porodu' className={style.FullInput} required onInput={SetFormInputHandler} readonly={isReadonly}/>

            </span>
        </section>
    )
}

export default BabyDetailsSection