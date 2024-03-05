import style from './css/PatientDocumentationDisplay.module.css'

import BabyFeedingSection from '../PatientDocumentationSections/NextDocumentationSections/BabyFeedingSection'
import BabyAdditionalFeeding from '../PatientDocumentationSections/NextDocumentationSections/BabyAdditionalFeeding'
import PatientBreastExaminationSection from '../PatientDocumentationSections/NextDocumentationSections/PatientBreastExaminationSection'

import BabyExcretionSection from '../PatientDocumentationSections/NextDocumentationSections/BabyExcretionSection'
import PatientMedicineSection from '../PatientDocumentationSections/NextDocumentationSections/PatientMedicineSection'
import PatientRecommendationSection from '../PatientDocumentationSections/NextDocumentationSections/PatientRecommendationSection'

const PatientDocumentationDisplay_NEXT = ({formInputs}) => {
    return (
        <form className={style.DocumentContent}>
            <div className={style.LeftSide}>
                <BabyFeedingSection formInputs={formInputs} readlOnlyMode />
                <BabyAdditionalFeeding formInputs={formInputs} readlOnlyMode /> 
                <PatientBreastExaminationSection formInputs={formInputs} readlOnlyMode />
            </div>
            <div className={style.RightSide}>
                <BabyExcretionSection formInputs={formInputs} readlOnlyMode />
                <PatientMedicineSection formInputs={formInputs} readlOnlyMode />
                <PatientRecommendationSection formInputs={formInputs} readlOnlyMode />
            </div>
        </form>
    )
}

export default PatientDocumentationDisplay_NEXT