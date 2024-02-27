import { useState,useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { SetActivePatient } from '../../../../../context/slices/PatientSearch_SLICE';

import {motion} from 'framer-motion'

import style from '../css/PatientSearch.module.css'

import IconInput from '../../../../utility/IconInput';
import PatientElement from './PatientElement';

import { IoClose } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

import { GetPatientsListFilteredByTerm } from '../../../../../assets/main/GetPatientsListFilteredByTerm';
import { AnimatePresence } from 'framer-motion';

const PatientSearch = ({patients,className,showNewPatientForm}) => {

    const [searchTerm,setSearchTerm] = useState("");
    const [patientList,setPatientList] = useState(patients)

    const dispatch = useDispatch()

    let timeout

    useEffect(()=>{
        timeout = setTimeout(()=>{
            const filteredPatients = GetPatientsListFilteredByTerm(patients,searchTerm)
            setPatientList(filteredPatients)
        },300)

        return () => {
            clearTimeout(timeout)
        }
    },[searchTerm])

    const SearchInputHandler = (event) => {
        setSearchTerm(event.target.value)
    }

    const ClearInputClickHandler = () => {
        setSearchTerm('')
    }

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
                <IconInput placeholder='Imie i nazwisko' value={searchTerm} onInput={SearchInputHandler}>
                    {searchTerm.length === 0 ? <CiSearch /> : <IoClose onClick={ClearInputClickHandler} /> }
                </IconInput>
            </div>
            <div className={style.PatientsList}>
                <AnimatePresence mode='wait'>
                    {patientList.map((patient) => (
                        <PatientElement key={patient.id} id={patient.id} firstName={patient.firstName} 
                                        lastName={patient.lastName} city={patient.city} 
                                        address={patient.address} setActivePatient={PatientElementClickHandler}/>
                    ))}
                </AnimatePresence>
            </div>
        </> 
    )
}

export default PatientSearch