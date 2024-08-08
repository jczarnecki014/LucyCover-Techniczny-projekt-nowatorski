import style from '../css/PatientSearch.module.css'
import { useSelector } from 'react-redux';

import {motion} from 'framer-motion'

import { FaUser } from "react-icons/fa";

const variants = {
    noVisible: {opacity:0, scale:0.3},
    visible: {opacity:1, scale:1},
}

const PatientElement = ({id,firstName,lastName,city,address,birthDate,patientType,setActivePatient,activePatientId,disabled}) => {
    const ClickHandler = () => {
        setActivePatient(id)
    }

    const isActive = activePatientId === id;
    return (
        <motion.div initial={'noVisible'} 
                    animate={'visible'}
                    exit={'noVisible'} 
                    while 
                    variants={variants}  
                    className={`${style.PatientElement} ${isActive ? style.active: ''} ${disabled ? style.disabled:''}`} 
                    onClick={ClickHandler}
        >

            <div className={style.IconBackground}>
                <FaUser size={60} />
            </div>
            <h5>{firstName} {lastName}</h5>
            {
                patientType == 'mother' && (
                    <>
                        <h6>{city}</h6>
                        <h6>ul.{address}</h6>
                    </>
                )
            }
            {
                patientType == 'children' && (
                    <>
                        <h6>URODZONY</h6>
                        <h6>{birthDate}</h6>
                    </>
                )
            }
        </motion.div>
    )
}

export default PatientElement

