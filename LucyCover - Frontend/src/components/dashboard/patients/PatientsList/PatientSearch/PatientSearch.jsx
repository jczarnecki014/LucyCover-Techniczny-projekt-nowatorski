//Components
import SearchInput from '../../../../utility/SearchInput';
import PatientElement from './PatientElement';
import { AnimatePresence } from 'framer-motion';
//Style
import style from '../css/PatientSearch.module.css'
//Hooks
import { useDispatch,useSelector } from 'react-redux';
import { useState } from 'react';
import useSearchList from '../../../../../hooks/useSearchList'
//Store
import { SetActivePatient } from '../../../../../context/slices/PatientSearch_SLICE';


/**
 * PatientSearch - component to display and filter list of patients
 * 
 * Functionality:
 * 
 *  [1] - Displaying list of patients
 * 
 *  [2] - Filter patients
 * 
 */

const PatientSearch = ({patients,showNewPatientForm}) => {
    const [searchPhrase,SetSearchPhrase] = useState("");
    const patientList = useSearchList({
        list:patients,
        searchPhrase
    });

    const dispatch = useDispatch()
    const activePatientId = useSelector(state => state.patientSearch.activePatient.id);

    const NewPatietntButtonClickHandler = () => {
        showNewPatientForm({display: true, mode:'content'})
    }

    const PatientElementClickHandler = (id) => {
        const selectedPatient = patients.find((patient) => patient.id === id);
        dispatch(SetActivePatient(selectedPatient))
    }

    return (
        <>
            <div className={style.Header}>
                <button onClick={NewPatietntButtonClickHandler}>Dodaj</button>
                <SearchInput placeholder='Imie i nazwisko' value={searchPhrase} SetSearchPhrase={SetSearchPhrase} />
            </div>
            <div className={style.PatientsList}>
                <AnimatePresence mode='wait'>
                    {patientList.map((patient) => (
                        <PatientElement key={patient.id} id={patient.id} firstName={patient.firstName} 
                                        lastName={patient.lastName} city={patient.city} 
                                        address={patient.address} patientType='mother' setActivePatient={PatientElementClickHandler} activePatientId={activePatientId}/>
                    ))}
                </AnimatePresence>
            </div>
        </> 
    )
}

export default PatientSearch