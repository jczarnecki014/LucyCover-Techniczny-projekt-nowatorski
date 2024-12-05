//Components
import PageBreakLayout from "../PageBreakLayout/PageBreakLayout"
import PatientVisitsTable from "../PatientVisitManager/PatientVisitTable/PatientVisitsTable"
import VisitManager from "./VisitManager/VisitManager"
import DeleteConfirmation from "../PatientsPopups/DeleteConfirmation"
//Style
import style from "./css/PatientVisitsWrapper.module.css"
//Hooks
import { useState } from "react"
import { useDispatch,useSelector } from "react-redux"
//Store
import { LoadDefaultData, SetFormDefault } from "@context/slices/AddNewVisitToScheduleForm"
import { ResetActivePatients } from "@context/slices/PatientSearch_SLICE"
import { OverlayToggle } from "@context/slices/OverlayModel_SLICE"
//Api
import { DeleteSchedule } from "@api/https"
//Assets
import { GetDayFullMonthDate } from "@assets/main/GetDayFullMonthDate"
import {format} from 'date-fns'

/**
 * PatientVisitsWrapper - Component provide:
 * 
 *  [1] - Displaying visit table
 *  
 *  [2] - Visit creator / edit form
 * 
 *  [3] - Visit status modifier
 * 
 * Props:
 * 
 * @param {string} selectedDay - Date of displaying visits (it is displayed on top of table)
 * @param {Array} visits - Visits to display 
 * @param {boolean} isSchedulePage - boolean which indicates if displayed PatientVisitsWrapper is used by schedule page. 
 * For schedule page displaying is slighly diffrent
 * @param {string} rightBtn - object to config [2] button - it takes object as {func: Function, desc:"btn description"}
 * @param {boolean} isPending - boolen to pass information about some processing. 
 * @param {React.Component} children - additional component which will be wrapped by PatientVisitsWrapper
 * @returns 
 */

const PatientVisitsWrapper = ({selectedDay,visits,isSchedulePage,isPending,children}) => {
    const overlayDisplay = useSelector((state) => state.overlayModel.isVisible)
    const dispatch = useDispatch();

    const [popupMode,setPopupMode] = useState('AddNewVisit / EditVisit / DeleteConfirmation')
    const [deleteConfirmationDetails,setDeleteConfirmationDetails] = useState() // {date,firstName,lastName}
    const [visitToEditId,setVisitToEditId] = useState();

    const AddNewVisitPopupHandler = () => {
        setPopupMode('AddNewVisit')
        dispatch(SetFormDefault())
        dispatch(ResetActivePatients())
        if(selectedDay) {
            const dateForInput = format(selectedDay,'yyyy-MM-dd');
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
            ...visits.find(visit => visit.id === visitToEditId ),
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
                <PageBreakLayout.LeftSide overflowY>
                    {children}
                </PageBreakLayout.LeftSide>
                <PageBreakLayout.RightSide>
                    <div>
                        {isSchedulePage && (
                            <div className={style.DateInfo}>
                                <h4>{GetDayFullMonthDate(selectedDay)}</h4>
                            </div>
                        )}
                        <PatientVisitsTable
                            isSchedulePage={isSchedulePage} 
                            addNewVisitPopupInvoke={AddNewVisitPopupHandler}
                            deletePopupInvoke={DeleteConfirmationPopupHandler} 
                            editVisitPopupInvoke={EditVisitPoupHandler} 
                            visits={visits} 
                            isPending={isPending != null && isPending}/>
                    </div>
                </PageBreakLayout.RightSide>
            </PageBreakLayout>
        </>
    )
}

export default PatientVisitsWrapper