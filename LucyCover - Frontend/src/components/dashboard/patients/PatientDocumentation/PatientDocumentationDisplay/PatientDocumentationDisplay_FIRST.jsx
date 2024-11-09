//Components
import PatientDetailsSection from "../PatientDocumentationSections/FirstDocumentationSections/PatientDetailsSection";
import BabyDetailsSection from "../PatientDocumentationSections/FirstDocumentationSections/BabyDetailsSection";
import PatientFamilyInterviewSection from "../PatientDocumentationSections/FirstDocumentationSections/PatientFamilyInterviewSection";
//Style
import style from './css/PatientDocumentationDisplay.module.css'

/**
 * PatientDocumentationDisplay_FIRST - component to displaying information about first visit documentation
 * 
 * It is child component for PatientDocumentationDisplay
 * 
 * Functionality: 
 * 
 *  [1] - Displaying first visit documentation
 * 
* Params:
 * 
 *  @param {object} formInputs - provide data to fill inputs
 * 
 */

const PatientDocumentationDisplay_FIRST = ({formInputs}) => {
    return (
        <form className={style.DocumentContent}>
            <div className={style.LeftSide}>
                <PatientDetailsSection formInputs={formInputs} readOnlyMode/>
                <BabyDetailsSection formInputs={formInputs} readOnlyMode />
            </div>
            <div className={style.RightSide}>
                <PatientFamilyInterviewSection formInputs={formInputs} readOnlyMode/>
            </div>
        </form>
    )
}

export default PatientDocumentationDisplay_FIRST