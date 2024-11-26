//Components
import { AnimatePresence } from "framer-motion"
import PatientTable from "../../PatientTable/PatientTable"
import TableButtons from "../../PatientTable/TableButtons"
import AddPatientDocumentation from "../AddPatientDocumentation/AddPatientDocumentation"
import DeleteConfirmation from "../../../../utility/PatientsPopups/DeleteConfirmation"
//Style
import style from './css/PatientDocumentation.module.css'
//Hooks
import { useSelector,useDispatch} from "react-redux"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
//Store
import { OverlayToggle } from "../../../../../context/slices/OverlayModel_SLICE"
//Api
import { DeleteDocumentation } from "../../../../../api/https"
import { FetchDocumentation } from "../../../../../api/https"

/**
 * PatientDocumentationList - component to display list of all patients visit. From this place use can select which one he would display
 * 
 * Functionality: 
 * 
 *  [1] - Displaying list of visits
 * 
 *  [2] - Custom styling for first and next documentation
 * 
 *  [3] - Buttons to delate and add new documentation
 * 
 */

const PatientDocumentationList = () => {
    //Take data from cache by tanstack query
    const {data}  = useQuery({
        queryKey: ['documentation'],
        refetchOnWindowFocus:true,
        queryFn: ({signal}) => FetchDocumentation({signal,patientId:data.patient.id})
    })
    const popupIsVisible = useSelector((state) => state.overlayModel.isVisible)

    const [popupDetails,setPopupDetails] = useState({
        mode:'AddingForm / DeleteConfirmation',
        popupData: {
            day:'',
            patient:'',
            elementId: ''
        },
    });

    const dispatch = useDispatch();

    const showPopupHandler = (popupMode,popupData={}) => {
        dispatch(OverlayToggle(true))
        setPopupDetails({
            mode:popupMode,
            popupData
        })
    }

    return (
        <>
            <AnimatePresence>
                {(popupIsVisible && popupDetails.mode === 'AddingForm')  && <AddPatientDocumentation patientId={data.patient.id} patientData={data.patient} />}

                {(popupIsVisible && popupDetails.mode === 'DeleteConfirmation')  && 
                    <DeleteConfirmation 
                        what='dokumentacje' 
                        day={popupDetails.popupData.day} 
                        patient={`${popupDetails.popupData.patient.childFirstName} ${popupDetails.popupData.patient.childLastName}`}
                        elementId={popupDetails.popupData.elementId} 
                        deleteAction={DeleteDocumentation} 
                    />
                }
            </AnimatePresence>
            
            <PatientTable columns={['ID','Data wizyty','Dziecko']} data={data.documentation} patientName={`${data.patient.firstName} ${data.patient.lastName}`} showPopup={showPopupHandler}>
                {(documentation) => documentation.map(document => {
                    return (
                        <tr id={document.first ? style.First : ''} key={document.id}>
                            <td>{document.id}</td>
                            <td>{document.date}</td>
                            <td>{document.child.childFirstName} {document.child.childLastName}</td>
                            <TableButtons document={{...document,patient:document.baby}} showPopup={showPopupHandler} />
                        </tr>
                    )
                })}
            </PatientTable>
        </>
    )
}

export default PatientDocumentationList

