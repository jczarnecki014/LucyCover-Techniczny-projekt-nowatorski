import style from '../css/PatientDocumentationSections.module.css'

import LabelInput from '../../../../../utility/LabelInput'
import SelectInput from '../../../../../utility/SelectInput'

import TextArea from '../../../../../utility/TextArea'

const PatientFamilyInterviewSection = ({SetFormInputHandler,formInputs,readOnlyMode}) => {
    const isReadonly = readOnlyMode;
    return (
        <section className={style.PatientFormSection}>
            
            <TextArea controlId='documentationReason' label="Powód zgłoszenia" className={style.FullInput} onChange={SetFormInputHandler} defaultValue={formInputs.motherFirstName} readonly={isReadonly} />

            <h6>Wywiad rodzinny</h6>
            <hr />
            <span>
                <SelectInput controlId="motherBreastfeedBefore" label="Karmienie poprzednich dzieci piersią" className={style.FullInput} options={['Pierwsze dziecko',"Tak", "Nie"]} onChange={SetFormInputHandler} readonly={isReadonly} defaultOption={formInputs.motherBreastfeedBefore} />
                
                {
                    formInputs.motherBreastfeedBefore === 'Tak' && <LabelInput controlId='motherBreastfeedBefore_HowLong' label='Jak długo karmiła ?' className={style.FullInput} onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.motherBreastfeedBefore_HowLong} />
                }

                {
                    formInputs.motherBreastfeedBefore === 'Nie' && <LabelInput controlId='motherBreastfeedBefore_Why' label='Dlaczego nie karmiła ?' className={style.FullInput} onInput={SetFormInputHandler} readonly={isReadonly} value={formInputs.motherBreastfeedBefore_Why} />
                }
            </span>
        </section>
    )
}

export default PatientFamilyInterviewSection