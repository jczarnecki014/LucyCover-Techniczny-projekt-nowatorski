import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSelector,useDispatch } from 'react-redux';
import { SetActivePatient,SetActiveChildren } from '../../../../context/slices/PatientSearch_SLICE';
import { LoadDefaultData } from '../../../../context/slices/AddNewVisitToScheduleForm';
import { queryClient, upsertVisit } from '../../../../api/https';
import VisitForm from './VisitForm';
import ChoosePatientList from '../../../dashboard/patients/PatientsList/PatientSearch/ChoosePatientList'
import ChooseChildrenList from './ChooseChildrenList';
import VisitConfirmation from './VisitConfirmation';
import Popup from '../../../utility/Popup';

const VisitManager = ({visitToEdit}) => {
    const [formMode,setFormMode] = useState('visitFormMode');//visitFormMode/patientsListMode/childrenListMode/visitNotyfication/error
    const activePatient = useSelector(state => state.patientSearch.activePatient);
    const activeChildren = useSelector(state => state.patientSearch.activeChildren);
    const dispatch = useDispatch()

    const {mutate,error,isPending} = useMutation({
        mutationFn: upsertVisit,
        onSuccess: () => {
            queryClient.invalidateQueries(['schedule'])
            setFormMode("success")
        },
        onError: (error) => {
            setFormMode("error");
        }
    })

    const SetFormDisplayHandler = (mode) => {
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
                formMode === 'visitFormMode' && <VisitForm SetFormDisplayHandler={SetFormDisplayHandler} activePatient={activePatient} activeChildren={activeChildren} visitID={visitId} />
            }
            {
                formMode === 'patientsListMode' &&  <ChoosePatientList closeFunc={()=>SetFormDisplayHandler('visitFormMode')} />
            }
            {
                formMode === 'childrenListMode' && <ChooseChildrenList activePatient={activePatient} formModeChange={SetFormDisplayHandler}  />
            }
            {
                formMode === 'visitConfirmation' && <VisitConfirmation activePatient={activePatient} mutate={mutate} visitId={visitId} activeChildren={activeChildren} isPending={isPending} />
            }
            {
                formMode === 'error' && <Popup type="error" title="Wystąpił błąd !" description={error.message} />
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