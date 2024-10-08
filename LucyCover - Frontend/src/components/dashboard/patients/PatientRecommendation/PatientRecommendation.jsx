import { useState } from "react"
import { useLoaderData } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"
import { OverlayToggle } from "../../../../context/slices/OverlayModel_SLICE"
import TableButtons from "../PatientTable/TableButtons"
import PatientTable from "../PatientTable/PatientTable"
import AddPatientRecommendation from "./AddPatientRecommendation"
import DeleteConfirmation from '../../../utility/PatientsPopups/DeleteConfirmation'
import { AnimatePresence } from "framer-motion"
import { useQuery } from "@tanstack/react-query"
import { fetchRecommendation } from "../../../../api/https"
import { DeleteRecommendation } from "../../../../api/https"

const PatientRecommendation = () => {
    const {data} = useQuery({
        queryKey: ['recommendations'],
        queryFn: ({signal}) => fetchRecommendation({signal,patientId:data.patientId})
    })
    const {recommendations,patientFirstName,patientLastName,patientId} = data;

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
    console.log(popupDetails)
    const patientName = `${patientFirstName} ${patientLastName}`
    return (
        <>
            <AnimatePresence>
                {
                    (popupIsVisible && popupDetails.mode === 'AddingForm') && <AddPatientRecommendation patientId={patientId} />
                }
                {
                    (popupIsVisible && popupDetails.mode === 'DeleteConfirmation') && 
                    <DeleteConfirmation 
                        what="zalecenia" 
                        day={popupDetails.popupData.day} 
                        patient={patientName}  // ??? not work
                        deleteAction={DeleteRecommendation} 
                        queries={['recommendations']} 
                        elementId={popupDetails.popupData.elementId}/>
                }
            </AnimatePresence>

            <PatientTable columns={['ID',"Data wystawienia zalecenia"]} data={recommendations} patientName={patientName} showPopup={ShowPopupHandler} >
                {(recommendation) => recommendation.map(element => {
                    return (
                        <tr key={element.id} >
                            <td>{element.id}</td>
                            <td>{element.date}</td>
                            <TableButtons document={{...element,patient:patientName}} showPopup={ShowPopupHandler} />
                        </tr>
                    )
                })}
            </PatientTable>
        </>
    )
}

export default PatientRecommendation

