import { AnimatePresence } from "framer-motion"
import PatientTable from "../../PatientTable/PatientTable"
import TableButtons from "../../PatientTable/TableButtons"
import AddPatientDocumentation from "../AddPatientDocumentation/AddPatientDocumentation"
import DeleteConfirmation from "../../PatientsPopups.jsx/DeleteConfirmation"

import style from './css/PatientDocumentation.module.css'

import { useSelector} from "react-redux"
import { useLoaderData } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { OverlayToggle } from "../../../../../context/slices/OverlayModel_SLICE"
import { useState } from "react"

const PatientDocumentationList = () => {
    const patientData = useLoaderData()
    const popupIsVisible = useSelector((state) => state.overlayModel.isVisible)
    const [popupDetails,setFormMode] = useState({
        mode:'AddPatientDocumentation',
        popupData: {
            day:'',
            patient:'',
        },
    });

    const dispatch = useDispatch();

    const showPopupHandler = (popupMode,popupData={}) => {
        dispatch(OverlayToggle(true))
        setFormMode({
            mode:popupMode,
            popupData
        })
    }

    return (
        <>
            <AnimatePresence>
                {(popupIsVisible && popupDetails.mode === 'AddPatientDocumentation')  && <AddPatientDocumentation />}
                {(popupIsVisible && popupDetails.mode === 'DeleteConfirmation')  && <DeleteConfirmation what='dokumentacje' day={popupDetails.popupData.day} patient={popupDetails.popupData.patient} />}
            </AnimatePresence>
            
            <PatientTable columns={['ID','Data wizyty','Dziecko']} data={patientData.documentation} patientName={patientData.patientName} showPopup={showPopupHandler}>
                {(documentation) => documentation.map(document => {
                    return (
                        <tr id={document.first ? style.First : ''} key={document.id}>
                            <td>{document.id}</td>
                            <td>{document.date}</td>
                            <td>{document.baby}</td>
                            <TableButtons document={document} showPopup={showPopupHandler} />
                        </tr>
                    )
                })}
            </PatientTable>
        </>
    )
}

export default PatientDocumentationList

