import { useQuery } from '@tanstack/react-query'
import { fetchPatientsForSearchList } from '../../../../api/https'
import { useDispatch,useSelector } from 'react-redux'
import { SetActivePatient } from '../../../../context/slices/PatientSearch_SLICE'
import PatientSearchList from "./PatientSearchList"
import PatientElement from "../../patients/PatientsList/PatientSearch/PatientElement"

const ChoosePatientList = ({formModeChange}) => {
    const dispatch = useDispatch();
    const activePatientId = useSelector(state => state.patientSearch.activePatient.id);
    
    const {data,isPending} = useQuery({
        queryKey: ['patients'],
        queryFn: ({signal}) => fetchPatientsForSearchList(signal)
    })

    const PatientElementClickHandler = (id) => {
        const selectedPatient = data.find((patient) => patient.id === id);
        dispatch(SetActivePatient(selectedPatient))
    }
    return (
        <>
        { 
            data && 
                <PatientSearchList listElements={data} closeFunc={()=>formModeChange('visitFormMode')}>
                    {
                        (patient) => (
                            <PatientElement key={patient.id} id={patient.id} firstName={patient.firstName} lastName={patient.lastName} address={patient.address} city={patient.city} patientType='mother' setActivePatient={PatientElementClickHandler} activePatientId={activePatientId} />
                        )
                    }
                </PatientSearchList>
        }
        {
            isPending && <p>Ładowanie...</p>
        }
        </>
    )
}

export default ChoosePatientList