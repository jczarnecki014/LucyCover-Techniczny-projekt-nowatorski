import style from './css/PatientDetails.module.css'

import {motion,AnimatePresence} from 'framer-motion'

import PatientHeader from './PatientHeader';
import PatientName from './PatientName';
import PatientContact from './PatientContact';
import PatientChildrens from './PatientChildrens';


const PatientDetails = ({children}) => {
    
    return (
        <div className={style.PatientDetails}>
            {children}
        </div>
    )
}

PatientDetails.Header = PatientHeader
PatientDetails.NameSection = PatientName
PatientDetails.ContactSection = PatientContact
PatientDetails.ChildrenSection = PatientChildrens

export default PatientDetails