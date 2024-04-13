import { useState } from "react"
import { useLoaderData } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"
import { OverlayToggle } from "../../../../context/slices/OverlayModel_SLICE"
import TableButtons from "../PatientTable/TableButtons"
import PatientTable from "../PatientTable/PatientTable"
import AddPatientRecommendation from "./AddPatientRecommendation"
import DeleteConfirmation from '../../../utility/PatientsPopups/DeleteConfirmation'
import { AnimatePresence } from "framer-motion"

const PatientRecommendation = () => {
    const patientData = useLoaderData()

    const popupIsVisible = useSelector((state) => state.overlayModel.isVisible)
    const dispatch = useDispatch();

    const [popupDetails,setFormMode] = useState({
        mode:'AddingForm / DeleteConfirmation',
        popupData: {
            day:'',
            patient:'',
        },
    });

    const ShowPopupHandler = (popupMode,popupData={}) => {
        dispatch(OverlayToggle(true))
        setFormMode({
            mode:popupMode,
            popupData
        })
    }

    return (
        <>
            <AnimatePresence>
                {
                    (popupIsVisible && popupDetails.mode === 'AddingForm') && <AddPatientRecommendation />
                }
                {
                    (popupIsVisible && popupDetails.mode === 'DeleteConfirmation') && <DeleteConfirmation what="zalecenia" day={popupDetails.popupData.day} patient={popupDetails.popupData.patient} />
                }
            </AnimatePresence>

            <PatientTable columns={['ID',"Data wystawienia zalecenia"]} data={patientData.recommendation} patientName={patientData.patientName} showPopup={ShowPopupHandler} >
                {(recommendation) => recommendation.map(element => {
                    return (
                        <tr key={element.id} >
                            <td>{element.id}</td>
                            <td>{element.date}</td>
                            <TableButtons document={{...element,patient:patientData.patientName}} showPopup={ShowPopupHandler} />
                        </tr>
                    )
                })}
            </PatientTable>
        </>
    )
}

export default PatientRecommendation

