import {DUMMY_PATIENTS} from '../../../../assets/DUMMY_DATA/DUMMY_PATIENTS'
import { useDispatch,useSelector } from 'react-redux'
import { SetActivePatient,ResetActivePatients } from '../../../../context/slices/PatientSearch_SLICE'
import PatientSearchList from "./PatientSearchList"
import PatientElement from "../../patients/PatientsList/PatientSearch/PatientElement"

const ChoosePatientList = ({formModeChange}) => {
    const dispatch = useDispatch();
    const activePatientId = useSelector(state => state.patientSearch.activePatient.id);
    
    const PatientElementClickHandler = (id) => {
        const selectedPatient = DUMMY_PATIENTS.find((patient) => patient.id === id);
        dispatch(SetActivePatient(selectedPatient))
    }

    return (
        <PatientSearchList listElements={DUMMY_PATIENTS} closeFunc={()=>formModeChange('visitFormMode')}>
            {
                (patient) => (
                    <PatientElement key={patient.id} id={patient.id} firstName={patient.firstName} lastName={patient.lastName} address={patient.address} city={patient.city} patientType='mother' setActivePatient={PatientElementClickHandler} activePatientId={activePatientId} />
                )
            }
        </PatientSearchList>
    )
}

export default ChoosePatientList