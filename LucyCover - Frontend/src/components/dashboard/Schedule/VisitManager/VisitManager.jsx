import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { SetActivePatient,SetActiveChildren } from '../../../../context/slices/PatientSearch_SLICE';
import { LoadDefaultData } from '../../../../context/slices/AddNewVisitToScheduleForm';
import VisitForm from './VisitForm';
import ChoosePatientList from './ChoosePatientList';
import ChooseChildrenList from './ChooseChildrenList';
import VisitNotyfications from './VisitNotyfications';
import Popup from '../../../utility/Popup';

const VisitManager = ({visitToEdit}) => {
    const [formMode,setFormMode] = useState('visitFormMode');//visitFormMode/patientsListMode/childrenListMode/visitNotyfication/error
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
                formMode === 'patientsListMode' && <ChoosePatientList formModeChange={SetFormDisplayHandler} />
            }
            {
                formMode === 'childrenListMode' && <ChooseChildrenList activePatient={activePatient} formModeChange={SetFormDisplayHandler}  />
            }
            {
                formMode === 'visitNotyfication' && <VisitNotyfications activePatient={activePatient} />
            }
            {
                formMode === 'error' && <Popup type="error" title="Wystąpił błąd !" description="Podczas operacji wystąpiły nie przewidziane błędy. Proszę spróbować później lub skontaktować się z administratorem systemu." />
            }
        </>
    )
}

export default VisitManager