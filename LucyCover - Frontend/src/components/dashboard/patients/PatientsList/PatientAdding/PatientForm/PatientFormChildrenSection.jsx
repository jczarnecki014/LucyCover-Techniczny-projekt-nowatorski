import style from '../../css/PatientAddingForm.module.css'

import ChildrenElement from './ChildrenElement'

import {motion} from 'framer-motion'


const PatientFormChildrenSection = ({children}) => {


    return (
        <motion.div className={style.Children} layout>
            <h2>Dzieci objęte opieką położnej</h2>
            <div className={style.ChildrenList}>
                {children}
            </div>
            <button id={style.MobileVersion} className={style.SubmitButton}>Dodaj</button>
        </motion.div>
    )
}

PatientFormChildrenSection.ChildrenElement = ChildrenElement;

export default PatientFormChildrenSection