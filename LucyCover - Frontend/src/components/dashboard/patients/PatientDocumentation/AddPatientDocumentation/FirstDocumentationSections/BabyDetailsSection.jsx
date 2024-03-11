import style from '../css/AddPatientDocumentation_FORMS.module.css'

import LabelInput from '../../../../../utility/LabelInput'
import SelectInput from '../../../../../utility/SelectInput'

const BabyDetailsSection = ({SetFormInputHandler,formInputs}) => {
    return (
        <section className={style.PatientFormSection}>
            <h6>Dane dziecka</h6>
            <hr />
            <span>
                <LabelInput controlId='babyFirstName' label='Imie' className={style.StandardInput} required onInput={SetFormInputHandler} />
                <LabelInput controlId='babyAge' label='Wiek' className={style.StandardInput} required onInput={SetFormInputHandler} />
                <LabelInput controlId='babyBirthDay' label='Data urodzenia dziecka' className={style.FullInput} inputType='date' required onInput={SetFormInputHandler} />
                <LabelInput controlId='babyBirthPlace' label='Miejsce urodzenia (szpital)' className={style.FullInput} required onInput={SetFormInputHandler} />
                <LabelInput controlId='babyApgarScore' label='Apgar' className={style.StandardInput} required onInput={SetFormInputHandler} />

                <SelectInput controlId='babyBirthTime' label="Urodzone" className={style.StandardInput} options={["O czasie", "Wcześniej", "Później"]} 
                                onChange={SetFormInputHandler} />
                {
                    ['Wcześniej','Później'].includes(formInputs.babyBirthTime.value) && <LabelInput controlId='babyBirthTime_ADDITIONAL' label='O ile' className={style.FullInput} onInput={SetFormInputHandler} />
                }

                <SelectInput controlId='babyBirthType' label="Poród" className={style.FullInput} options={["Naturalny", "Zabiegowy", "Cięcie cesarskie"]} 
                            onChange={SetFormInputHandler} />
                
                {
                    ['Zabiegowy','Cięcie cesarskie'].includes(formInputs.babyBirthType.value) && <LabelInput controlId='babyBirthTypeReason' label='Powód takiego porodu' className={style.FullInput} onInput={SetFormInputHandler} />
                }

                <LabelInput controlId='babyBirthMedicine' label='Leki podczas porodu' className={style.FullInput} required onInput={SetFormInputHandler}/>

            </span>
        </section>
    )
}

export default BabyDetailsSection