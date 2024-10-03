import PatientMessageElement from "./PatientMessageSearchListElement"
import PatientMessageSearchListElement from "../PatientMessageSearchList/PatientMessageSearchListElement";
import style from '../css/Message.module.css'
import useSearchList from "../../../../hooks/useSeachList";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {motion} from "framer-motion";

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
                            onPatientClick={SetActivePatientHandler} />)}
                </AnimatePresence>
            </div>
        </div>
    )
}
PatientMessageSearchList.Patient = PatientMessageElement;
export default PatientMessageSearchList