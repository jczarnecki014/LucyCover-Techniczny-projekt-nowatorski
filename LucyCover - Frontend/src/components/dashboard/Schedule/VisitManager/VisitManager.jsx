import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { SetActivePatient,SetActiveChildren } from '../../../../context/slices/PatientSearch_SLICE';
import VisitForm from './VisitForm';
import ChoosePatientList from './ChoosePatientList';
import ChooseChildrenList from './ChooseChildrenList';
import VisitNotyfications from './VisitNotyfications';

const VisitManager = ({visitToEdit}) => {
    const [formMode,setFormMode] = useState('visitFormMode'); //visitFormMode / patientsListMode / childrenListMode / visitNotyfication
    const activePatient = useSelector(state => state.patientSearch.activePatient);
    const activeChildren = useSelector(state => state.patientSearch.activeChildren);
    const dispatch = useDispatch()
    const SetFormDisplayHandler = (mode) => {
        setFormMode(mode)
    }

    useEffect(()=>{
        if(!visitToEdit){
            return;
        }
        const {firstName,lastName,birthDate,phoneNumber} = visitToEdit.details
        const {childFirstName,childLastName,childBirthDate} = visitToEdit.details

        const activePatient = {
            id:visitToEdit.visit.patientId,
            firstName,
            lastName,
            birthDate,
            phoneNumber
        }
        const activeChildren = {
            childFirstName,
            childLastName,
            childBirthDate
        }

        dispatch(SetActivePatient(activePatient))
        dispatch(SetActiveChildren(activeChildren))
    },[visitToEdit])
    
    return (
        <>
            {
                formMode === 'visitFormMode' && <VisitForm SetFormDisplayHandler={SetFormDisplayHandler} activePatient={activePatient} activeChildren={activeChildren} visitToEdit={visitToEdit} />
            }
            {
                formMode === 'patientsListMode' && <ChoosePatientList formModeChange={SetFormDisplayHandler} />
            }
            {
                formMode === 'childrenListMode' && <ChooseChildrenList activePatient={activePatient} formModeChange={SetFormDisplayHandler}  />
            }
            {
                formMode === 'visitNotyfication' && <VisitNotyfications activePatient={activePatient} />
            }
        </>
    )
}

export default VisitManager