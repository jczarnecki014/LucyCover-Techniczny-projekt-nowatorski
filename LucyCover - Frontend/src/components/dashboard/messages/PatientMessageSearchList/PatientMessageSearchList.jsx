//Components
import { AnimatePresence } from "framer-motion";
import {motion} from "framer-motion";
import PatientMessageElement from "./PatientMessageSearchListElement"
import PatientMessageSearchListElement from "../PatientMessageSearchList/PatientMessageSearchListElement";
//Style
import style from '../css/Message.module.css'
//Hooks
import useSearchList from "../../../../hooks/useSeachList";
import { useState } from "react";

/**
 * PatientMessageSearchList - component to display list of patients which can be clicke to display messages between patient and system
 * 
 * Functionality: 
 * 
 *  [1] - Displaying patient list
 * 
 *  [2] - Searching specific patient by its details
 * Params:
 * 
 *  @param {Array} patientsList - full searchable list of patient
 * 
 *  @param {string} activePatientEmail - string with current selected patient email (special style)
 *  @param {function} SetActivePatientHandler - Function to setting patient as active / selected )
 * 
 */

const PatientMessageSearchList = ({patientsList,activePatientEmail,SetActivePatientHandler}) => {
    const [searchPhrase,SetSearchPhrase] = useState("");
    const searchList = useSearchList({
        list:patientsList,
        searchPhrase
    });

    const SearchInputChangeHandler = (event) => {
        SetSearchPhrase(event.target.value)
    }

    const isNoContent = searchList.length == 0
    
    return (
        <div className={style.PatientList}>
            <div className={style.SearchPatient}>
                <h5>Wyszukaj</h5>
                <input onChange={SearchInputChangeHandler}/>
            </div>
            <div id={isNoContent && style.NoContent} className={style.PatientElementsList}>
                {isNoContent && <motion.h4 >Brak wyników</motion.h4>}
                <AnimatePresence>
                    {searchList.map((patient,index) => 
                        <PatientMessageSearchListElement 
                            key={index} 
                            patient={patient} 
                            activePatientEmail={activePatientEmail} 
                            OnPatientClick={SetActivePatientHandler} />)}
                </AnimatePresence>
            </div>
        </div>
    )
}
PatientMessageSearchList.Patient = PatientMessageElement;
export default PatientMessageSearchList