//Components
import OverlayModel from "../OverlayModel"
import SearchInput from "../SearchInput"
import { AnimatePresence } from 'framer-motion'
//Style
import style from './css/PatientSearchList.module.css'
//Hooks
import { useState } from 'react'
import useSearchList from "../../../hooks/useSearchList";



/**
 * PatientSearchList - Component to search patient alloted to user 
 * 
 *  This is children componenent for VisitManager
 * 
 * Props:
 * 
 * @param {Array} listElements - List of avaiable patients
 * @param {Function} children - -||-
 * @param {Function} closeFunc - Function which will be invoke after component close
 * @param {Function} funcButton - Function which will be invoke when user click additional button
 */

const PatientSearchList = ({listElements,children,closeFunc,funcButton}) => {
    const [searchPhrase,SetSearchPhrase] = useState("");
    const patientList = useSearchList({
        list:listElements,
        searchPhrase
    });

    return (
        <OverlayModel 
            title="Baza pacjentów" 
            OnQuitButtonClick={closeFunc} 
            funcButton={funcButton ? funcButton : undefined} >

            <div className={style.Container}>
                <div className={style.TopBar}>
                    <SearchInput placeholder='Imie i nazwisko' value={searchPhrase} SetSearchPhrase={SetSearchPhrase} />
                </div>
                    {
                        (patientList != null && patientList.length > 0) &&  
                        (
                            <div className={style.PatientList}>
                                <AnimatePresence>
                                    {
                                    patientList.map(searchElement => children(searchElement))  
                                    }
                                </AnimatePresence>
                            </div>
                        )
                    }
                    {
                        (patientList == null || patientList.length == 0) && (
                            <div className={style.ErrorInfo}> 
                                <h2>Brak elementów do wyświetlenia</h2>
                            </div>
                        )
                    }
            </div>
        </OverlayModel>
    )
}

export default PatientSearchList