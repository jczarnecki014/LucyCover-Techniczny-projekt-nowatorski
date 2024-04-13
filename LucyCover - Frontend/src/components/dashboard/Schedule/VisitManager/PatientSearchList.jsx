import style from './css/PatientSearchList.module.css'

import { useState,useEffect } from 'react'

import OverlayModel from "../../../utility/OverlayModel"
import IconInput from '../../../utility/IconInput'
import { IoClose } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

import { GetPatientsListFilteredByTerm } from '../../../../assets/main/GetPatientsListFilteredByTerm'
import { AnimatePresence } from 'framer-motion'


const PatientSearchList = ({listElements,children,closeFunc}) => {

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
        <OverlayModel title="Baza pacjentów" OnQuitButtonClick={closeFunc} >
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