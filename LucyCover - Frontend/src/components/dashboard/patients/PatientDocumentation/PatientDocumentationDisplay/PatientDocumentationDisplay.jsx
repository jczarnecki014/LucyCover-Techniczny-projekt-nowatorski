import style from './css/PatientDocumentationDisplay.module.css'
import { useSelector } from 'react-redux'
import { useLoaderData } from 'react-router-dom';

import PatientDetailsSection from "../PatientDocumentationSections/FirstDocumentationSections/PatientDetailsSection";
import BabyDetailsSection from "../PatientDocumentationSections/FirstDocumentationSections/BabyDetailsSection";
import PatientFamilyInterviewSection from "../PatientDocumentationSections/FirstDocumentationSections/PatientFamilyInterviewSection";

const PatientDocumentationDisplay = () => {

    const formInputs = useLoaderData()

    return (
        <div className={style.Container}>
            <div className={style.TopBar}>
                <h6>Barbara Kret</h6>
                <h6>Kolejna wizyta</h6>
                <h6>Wizyta: 20.12.2023</h6>
                <div className={style.ButtonSection}>
                    <button id={style.EditButton}>Modyfikuj</button>
                    <button id={style.DeleteButton}>Usuń</button>
                </div>
            </div>
            <form className={style.DocumentContent}>
                <div className={style.LeftSide}>
                    <PatientDetailsSection formInputs={formInputs} displayMode/>
                    <BabyDetailsSection formInputs={formInputs} displayMode />
                </div>
                <div className={style.RightSide}>
                    <PatientFamilyInterviewSection formInputs={formInputs} displayMode/>
                </div>
            </form>
        </div>
    )
}

export default PatientDocumentationDisplay