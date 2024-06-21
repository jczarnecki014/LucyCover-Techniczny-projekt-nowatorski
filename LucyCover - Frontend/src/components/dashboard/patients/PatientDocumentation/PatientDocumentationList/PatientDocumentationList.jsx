import { AnimatePresence } from "framer-motion"
import PatientTable from "../../PatientTable/PatientTable"
import TableButtons from "../../PatientTable/TableButtons"
import AddPatientDocumentation from "../AddPatientDocumentation/AddPatientDocumentation"
import DeleteConfirmation from "../../../../utility/PatientsPopups/DeleteConfirmation"
import style from './css/PatientDocumentation.module.css'
import { useSelector,useDispatch} from "react-redux"
import { useLoaderData } from "react-router-dom"
import { OverlayToggle } from "../../../../../context/slices/OverlayModel_SLICE"
import { useState } from "react"
import { DeleteDocumentation } from "../../../../../api/https"
import { useQuery } from "@tanstack/react-query"
import { fetchDocumentation } from "../../../../../api/https"

const PatientDocumentationList = () => {
    //Take data from cache by tanstack query
    const {data}  = useQuery({
        queryKey: ['documentation'],
        refetchOnWindowFocus:true,
        queryFn: ({signal}) => fetchDocumentation({signal,patientId:data.patient.id})
    })
    console.log(data)
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
                        childName={`${popupDetails.popupData.patient.childFirstName} ${popupDetails.popupData.patient.childLastName}`}
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

