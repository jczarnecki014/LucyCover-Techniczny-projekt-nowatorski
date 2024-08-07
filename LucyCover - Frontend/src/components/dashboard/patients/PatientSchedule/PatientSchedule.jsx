import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useLoaderData } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"
import { SetFormDefault } from "../../../../context/slices/AddNewVisitToScheduleForm"
import { ResetActivePatients } from "../../../../context/slices/PatientSearch_SLICE"
import { OverlayToggle } from "../../../../context/slices/OverlayModel_SLICE"
import PatientDetails from "../PatientDetails/PatientDetails"
import PatientLayout from "../PatientLayout/PatientLayout"
import PatientVisitsTable from "./PatientVisitsTable"
import VisitManager from "../../Schedule/VisitManager/VisitManager"
import DeleteConfirmation from "../../../utility/PatientsPopups/DeleteConfirmation"
import { fetchAllPatientVisits } from "../../../../api/https"


const PatientSchedule = () => {
    const overlayDisplay = useSelector((state) => state.overlayModel.isVisible)
    const dispatch = useDispatch();

    const [popupMode,setPopupMode] = useState('AddNewVisit / EditVisit / DeleteConfirmation')
    const [deleteConfirmationDetails,setDeleteConfirmationDetails] = useState()
    const [visitToEditId,setVisitToEditId] = useState();

    const {data} = useQuery({
        queryKey: ['schedule'],
        queryFn: ({signal}) => fetchAllPatientVisits({signal,patientId:data.patientDetails.patientId})
    })
    
    const {patientVisits} = data
    const {firstName,lastName,city,address,zipCode,province,phoneNumber,email,children} = data.patientDetails

    const AddNewVisitPopupHandler = () => {
        setPopupMode('AddNewVisit')
        dispatch(SetFormDefault())
        dispatch(ResetActivePatients())
        dispatch(OverlayToggle(true))
    }

    const DeleteConfirmationPopupHandler = (date) => {
        setPopupMode('DeleteConfirmation')
        setDeleteConfirmationDetails(date)
        dispatch(OverlayToggle(true))
    }

    const EditVisitPoupHandler = (visitId) => {
        setPopupMode('EditVisit')
        setVisitToEditId(visitId)
        dispatch(OverlayToggle(true))
    }

    let visitToEdit;

    if(visitToEditId){
        visitToEdit = {
            ...patientVisits.find(visit => visit.id === visitToEditId ),
        }
    }

    return (
        <>
            {(overlayDisplay && popupMode === 'AddNewVisit') && <VisitManager />}

            {(overlayDisplay && popupMode === 'EditVisit') && <VisitManager visitToEdit={visitToEdit} />}

            {(overlayDisplay && popupMode === 'DeleteConfirmation') && 
                <DeleteConfirmation what="wizytę" day={deleteConfirmationDetails} patient={`${firstName} ${lastName}`} />}

            <PatientLayout>
                <PatientLayout.LeftSide overflowY>
                    <PatientDetails>
                        <PatientDetails.NameSection firstName={firstName} lastName={lastName}/>
                        <PatientDetails.ContactSection city={city} street={address} zipCode={zipCode} province={province} phone={phoneNumber} email={email} />
                        <PatientDetails.ChildrenSection children={children} />
                    </PatientDetails>
                </PatientLayout.LeftSide>
                <PatientLayout.RightSide>
                    <PatientVisitsTable 
                        addNewVisitPopupInvoke={AddNewVisitPopupHandler}
                        deletePopupInvoke={DeleteConfirmationPopupHandler} 
                        editVisitPopupInvoke={EditVisitPoupHandler} 
                        visits={patientVisits} />
                </PatientLayout.RightSide>
            </PatientLayout>
        </>
    )
}

export default PatientSchedule