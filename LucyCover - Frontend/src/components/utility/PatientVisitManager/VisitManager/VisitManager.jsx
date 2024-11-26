//Components
import VisitForm from './VisitForm';
import ChoosePatientList from '../../PatientSearchList/ChoosePatientList'
import ChooseChildrenList from '../../PatientSearchList/ChooseChildrenList'
import VisitConfirmation from './VisitConfirmation';
import Popup from '../../../utility/Popup';
//Hooks
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSelector,useDispatch } from 'react-redux';
//Store
import { SetActivePatient,SetActiveChildren } from '../../../../context/slices/PatientSearch_SLICE';
import { LoadDefaultData } from '../../../../context/slices/AddNewVisitToScheduleForm';
//Api
import { queryClient, UpsertVisit } from '../../../../api/https'

/**
 * VisitManager - Component to control new vist form. It adjustment displayed overlay to specific phase of form filling
 * 
 *  [1] - Displaying visit form
 *  
 *  [2] - Display patient search box
 * 
 *  [3] - Display children search box
 * 
 *  [4] - Displach confirmations and state popups (error/succes)
 * 
 * Props:
 * 
 * @param {object} visitToEdit - an object to fill inputs with default values
 */

const VisitManager = ({visitToEdit}) => {
    const [formMode,setFormMode] = useState('visitFormMode');//visitFormMode/patientsListMode/childrenListMode/visitNotyfication
    const activePatient = useSelector(state => state.patientSearch.activePatient);
    const activeChildren = useSelector(state => state.patientSearch.activeChildren);
    const dispatch = useDispatch()

    const {mutate,isError,error,isPending} = useMutation({
        mutationFn: UpsertVisit,
        onSuccess: () => {
            queryClient.invalidateQueries(['schedule'])
            setFormMode("success")
        }
    })

    const ChangeFormMode = (mode) => {
        setFormMode(mode)
    }

    useEffect(()=>{
        if(!visitToEdit){
            return;
        }
        const {patientId,firstName,lastName,birthDate,phoneNumber,children,email} = visitToEdit
        const {childId,childFirstName,childLastName,childBirthDate} = visitToEdit
        const {city,street,streetNumber,zipCode,date,clock,description,status} = visitToEdit

        const activePatient = {
            id:patientId,
            firstName,
            lastName,
            birthDate,
            phoneNumber,
            children,
            email
        }
        const activeChildren = {
            id:childId,
            childFirstName,
            childLastName,
            childBirthDate
        }

        dispatch(SetActivePatient(activePatient))
        dispatch(SetActiveChildren(activeChildren))
        dispatch(LoadDefaultData({
            city,
            street,
            streetNumber,
            zipCode,
            date,
            clock,
            description,
            status
        }))
    },[visitToEdit])

    const visitId = visitToEdit && visitToEdit.id
    
    return (
        <>
            {
                formMode === 'visitFormMode' && <VisitForm ChangeFormMode={ChangeFormMode} activePatient={activePatient} activeChildren={activeChildren} visitID={visitId} />
            }
            {
                formMode === 'patientsListMode' &&  <ChoosePatientList closeFunc={()=>ChangeFormMode('visitFormMode')} />
            }
            {
                formMode === 'childrenListMode' && <ChooseChildrenList activePatient={activePatient} FormModeChange={ChangeFormMode}  />
            }
            {
                formMode === 'visitConfirmation' && <VisitConfirmation activePatient={activePatient} mutate={mutate} visitId={visitId} activeChildren={activeChildren} isPending={isPending} />
            }
            {
                isError && <Popup type="error" title="Wystąpił błąd !" description={error.message} />
            }
                        {
                formMode === 'success' && (
                    <Popup type='success' title="ZAPLANUJ WIZYTĘ" description="Wizyta została zaplanowana" />
                )
            }
        </>
    )
}

export default VisitManager