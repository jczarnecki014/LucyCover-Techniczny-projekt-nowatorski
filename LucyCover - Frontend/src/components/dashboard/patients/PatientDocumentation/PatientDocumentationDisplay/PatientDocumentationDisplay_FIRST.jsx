
import style from './css/PatientDocumentationDisplay.module.css'

import PatientDetailsSection from "../PatientDocumentationSections/FirstDocumentationSections/PatientDetailsSection";
import BabyDetailsSection from "../PatientDocumentationSections/FirstDocumentationSections/BabyDetailsSection";
import PatientFamilyInterviewSection from "../PatientDocumentationSections/FirstDocumentationSections/PatientFamilyInterviewSection";

const PatientDocumentationDisplay_FIRST = ({formInputs}) => {
    return (
        <form className={style.DocumentContent}>
            <div className={style.LeftSide}>
                <PatientDetailsSection formInputs={formInputs} readlOnlyMode/>
                <BabyDetailsSection formInputs={formInputs} readlOnlyMode />
            </div>
            <div className={style.RightSide}>
                <PatientFamilyInterviewSection formInputs={formInputs} readlOnlyMode/>
            </div>
        </form>
    )
}

export default PatientDocumentationDisplay_FIRST