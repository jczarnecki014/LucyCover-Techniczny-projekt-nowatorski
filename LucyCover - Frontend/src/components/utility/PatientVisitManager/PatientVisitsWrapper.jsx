import { useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { LoadDefaultData, SetFormDefault } from "../../../context/slices/AddNewVisitToScheduleForm"
import { ResetActivePatients } from "../../../context/slices/PatientSearch_SLICE"
import { OverlayToggle } from "../../../context/slices/OverlayModel_SLICE"
import PageBreakLayout from "../PageBreakLayout/PageBreakLayout"
import PatientVisitsTable from "../PatientVisitManager/PatientVisitTable/PatientVisitsTable"
import VisitManager from "./VisitManager/VisitManager"
import DeleteConfirmation from "../PatientsPopups/DeleteConfirmation"
import { DeleteSchedule } from "../../../api/https"
import { GetDayFullMonthDate } from "../../../assets/main/GetDayFullMonthDate"
import style from "./css/PatientVisitsWrapper.module.css"
import {format} from 'date-fns'


const PatientVisitsWrapper = (props) => {
    const overlayDisplay = useSelector((state) => state.overlayModel.isVisible)
    const dispatch = useDispatch();

    const [popupMode,setPopupMode] = useState('AddNewVisit / EditVisit / DeleteConfirmation')
    const [deleteConfirmationDetails,setDeleteConfirmationDetails] = useState() // {date,firstName,lastName}
    const [visitToEditId,setVisitToEditId] = useState();

    const AddNewVisitPopupHandler = () => {
        setPopupMode('AddNewVisit')
        dispatch(SetFormDefault())
        dispatch(ResetActivePatients())
        if(props.selectedDay) {
            const dateForInput = format(props.selectedDay,'yyyy-MM-dd');
            dispatch(LoadDefaultData({date:dateForInput}))
        }
        dispatch(OverlayToggle(true))
    }

    const DeleteConfirmationPopupHandler = (deleteDetails) => {
        setPopupMode('DeleteConfirmation')
        setDeleteConfirmationDetails(deleteDetails)
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
            ...props.visits.find(visit => visit.id === visitToEditId ),
        }
    }
    return (
        <>
            {(overlayDisplay && popupMode === 'AddNewVisit') && <VisitManager />}

            {(overlayDisplay && popupMode === 'EditVisit') && <VisitManager visitToEdit={visitToEdit} />}

            {(overlayDisplay && popupMode === 'DeleteConfirmation') && 
                <DeleteConfirmation 
                    what="wizytę" 
                    deleteAction={DeleteSchedule}
                    queries={["schedule"]}
                    elementId={deleteConfirmationDetails.id}
                    day={deleteConfirmationDetails.date} 
                    patient={`${deleteConfirmationDetails.firstName} ${deleteConfirmationDetails.lastName}`} />}

            <PageBreakLayout>
                <PageBreakLayout.LeftSide>
                    {props.children}
                </PageBreakLayout.LeftSide>
                <PageBreakLayout.RightSide>
                    <div>
                        {props.isSchedulePage && (
                            <div className={style.DateInfo}>
                                <h4>{GetDayFullMonthDate(props.selectedDay)}</h4>
                            </div>
                        )}
                        <PatientVisitsTable
                            isSchedulePage={props.isSchedulePage} 
                            addNewVisitPopupInvoke={AddNewVisitPopupHandler}
                            deletePopupInvoke={DeleteConfirmationPopupHandler} 
                            editVisitPopupInvoke={EditVisitPoupHandler} 
                            visits={props.visits} 
                            isPending={props.isPending != null && props.isPending}/>
                    </div>
                </PageBreakLayout.RightSide>
            </PageBreakLayout>
        </>
    )
}

export default PatientVisitsWrapper