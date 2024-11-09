//Components
import BabyFeedingSection from '../PatientDocumentationSections/NextDocumentationSections/BabyFeedingSection'
import BabyAdditionalFeeding from '../PatientDocumentationSections/NextDocumentationSections/BabyAdditionalFeeding'
import PatientBreastExaminationSection from '../PatientDocumentationSections/NextDocumentationSections/PatientBreastExaminationSection'
import BabyExcretionSection from '../PatientDocumentationSections/NextDocumentationSections/BabyExcretionSection'
import PatientMedicineSection from '../PatientDocumentationSections/NextDocumentationSections/PatientMedicineSection'
import PatientRecommendationSection from '../PatientDocumentationSections/NextDocumentationSections/PatientRecommendationSection'
//Style
import style from './css/PatientDocumentationDisplay.module.css'

/**
 * PatientDocumentationDisplay_NEXT - component to displaying information about next visit documentation
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

const PatientDocumentationDisplay_NEXT = ({formInputs}) => {
    return (
        <form className={style.DocumentContent}>
            <div className={style.LeftSide}>
                <BabyFeedingSection formInputs={formInputs} readOnlyMode />
                <BabyAdditionalFeeding formInputs={formInputs} readOnlyMode /> 
                <PatientBreastExaminationSection formInputs={formInputs} readOnlyMode />
            </div>
            <div className={style.RightSide}>
                <BabyExcretionSection formInputs={formInputs} readOnlyMode />
                <PatientMedicineSection formInputs={formInputs} readOnlyMode />
                <PatientRecommendationSection formInputs={formInputs} readOnlyMode />
            </div>
        </form>
    )
}

export default PatientDocumentationDisplay_NEXT