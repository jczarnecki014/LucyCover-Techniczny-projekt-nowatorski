import style from '../css/PatientDocumentationSections.module.css'

import LabelInput from '../../../../../utility/LabelInput'
import SelectInput from '../../../../../utility/SelectInput'

import TextArea from '../../../../../utility/TextArea'

const PatientFamilyInterviewSection = ({SetFormInputHandler,formInputs}) => {
    return (
        <section className={style.PatientFormSection}>

            <TextArea controlId='documentationReason' label="Powód zgłoszenia" className={style.FullInput} onChange={SetFormInputHandler}/>

            <h6>Wywiad rodzinny</h6>
            <hr />
            <span>
                <SelectInput controlId="motherBreastfeedBefore" label="Karmienie poprzednich dzieci piersią" className={style.FullInput} options={['Pierwsze dziecko',"Tak", "Nie"]} 
                            onChange={SetFormInputHandler} />
                
                {
                    formInputs.motherBreastfeedBefore.value === 'Tak' && <LabelInput controlId='motherBreastfeedBefore_HowLong' label='Jak długo karmiła ?' className={style.FullInput} onInput={SetFormInputHandler}/>
                }

                {
                    formInputs.motherBreastfeedBefore.value === 'Nie' && <LabelInput controlId='motherBreastfeedBefore_Why' label='Dlaczego nie karmiła ?' className={style.FullInput} onInput={SetFormInputHandler}/>
                }
            </span>
        </section>
    )
}

export default PatientFamilyInterviewSection