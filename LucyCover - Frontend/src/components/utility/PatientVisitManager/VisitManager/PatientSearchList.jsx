//Components
import OverlayModel from "../../../utility/OverlayModel"
import IconInput from '../../../utility/IconInput'
import { IoClose } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { AnimatePresence } from 'framer-motion'
//Style
import style from './css/PatientSearchList.module.css'
//Hooks
import { useState,useEffect } from 'react'
//Assets
import { GetPatientsListFilteredByTerm } from '../../../../assets/main/GetPatientsListFilteredByTerm'


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

const PatientSearchList = ({listElements,children,closeFunc, funcButton}) => {
    const [searchTerm,setSearchTerm] = useState("");
    const [searchList,setSearchList] = useState(listElements)

    let timeout
    //USE HOOK // przenieisnie funkcjonalnosci do IconInput ?
    useEffect(()=>{
        timeout = setTimeout(()=>{
            const filteredSearchList = GetPatientsListFilteredByTerm(listElements,searchTerm)
            setSearchList(filteredSearchList)
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

    return (
        <OverlayModel 
            title="Baza pacjentów" 
            OnQuitButtonClick={closeFunc} 
            funcButton={funcButton ? funcButton : undefined} >

            <div className={style.Container}>
                <div className={style.TopBar}>
                    <IconInput placeholder='Imie i nazwisko' value={searchTerm} onInput={SearchInputHandler}>
                        {searchTerm.length === 0 ? <CiSearch /> : <IoClose onClick={ClearInputClickHandler} /> }
                    </IconInput>
                </div>
                    {
                        (searchList != null && searchList.length > 0) &&  
                        (
                            <div className={style.PatientList}>
                                <AnimatePresence>
                                    {
                                    searchList.map(searchElement => children(searchElement))  
                                    }
                                </AnimatePresence>
                            </div>
                        )
                    }
                    {
                        (searchList == null || searchList.length == 0) && (
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