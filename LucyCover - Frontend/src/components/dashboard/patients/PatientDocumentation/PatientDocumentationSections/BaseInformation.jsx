//Components
import LabelInput from '../../../../utility/LabelInput'
import SelectList from '../../../../utility/SelectList';
//Style
import style from './css/PatientDocumentationSections.module.css'

/**
 * BaseInformation - component to display base information inputs. User have to specify which child is to be assigned to entered documentation and date of visit 
 * 
 * Functionality: 
 * 
 *  [1] - Display child and visit date input
 * 
 * 
 * Params:
 * 
 *  @param {function} SetFormInputHandler - Function invoke when select input change
 * 
 *  @param {object} formInputs - Value to fill for display mode ( read only )
 * 
 *  @param {boolean} readOnlyMode - indicates that inputs are display in read only mode and edit is impossible
 * 
 *  @param {Array} childrenList - Array with patient children to fill child select input 
 * 
 */

const BaseInformation = ({SetFormInputHandler,formInputs,readOnlyMode,childrenList}) => {
    const isReadonly = readOnlyMode;
    const childrenSelectOptions = [];

    childrenList.forEach((child) => {
        let label = `${child.childFirstName} ${child.childLastName}`
        let value = child.id
        let listObject = {label,value}
        childrenSelectOptions.push(listObject) 
    })
    return (
        <>
        {
            !isReadonly && (
                <section className={style.PatientFormSection}>
                    <span>
                        <h6>Informacje podstawowe</h6>
                        <hr />
                        <SelectList controlId='patientChildId' label='Imie i nazwisko dziecka' className={style.FullInput} onChange={SetFormInputHandler} options={childrenSelectOptions} defaultOption={formInputs.patientChildId} required />
                        <LabelInput controlId='visitDate' label='Data wizyty' className={style.FullInput} onInput={SetFormInputHandler}inputType="date" value={formInputs.visitDate} required />
                    </span>
                </section>
    )
        }
        </>
    )
}

export default BaseInformation