//Components
import PatientSearchList from './PatientSearchList'
import PatientElement from "../../dashboard/patients/PatientsList/PatientSearch/PatientElement"
//Hooks
import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
//Store
import { SetActivePatient } from '../../../context/slices/PatientSearch_SLICE'
//Api
import { FetchPatientsForSearchList } from '../../../api/https'

/**
 * ChoosePatientList - component to display other list of patients. It displays patient as a block. It is use in some forms where patient should be choosen from list
 * 
 * 
 * Functionality:
 * 
 *  [1] - Displaying list of patients
 * 
 *  [2] - Sekecting patient option.
 * 
 */


const ChoosePatientList = ({onSelect,disabledPatients,closeFunc}) => {
    const dispatch = useDispatch();
    const activePatientId = useSelector(state => state.patientSearch.activePatient.id);
    const {data,isPending} = useQuery({
        queryKey: ['patients'],
        queryFn: ({signal}) => FetchPatientsForSearchList(signal)
    })

    const PatientElementClickHandler = (id) => {
        const selectedPatient = data.find((patient) => patient.id === id);
        dispatch(SetActivePatient(selectedPatient))
    }
    return (
        <>
        { 
            data && 
                <PatientSearchList listElements={data} funcButton={onSelect ? onSelect : undefined} closeFunc={closeFunc}>
                    {
                        (patient) => (
                            <PatientElement 
                                key={patient.id} 
                                id={patient.id} 
                                firstName={patient.firstName} 
                                lastName={patient.lastName} 
                                address={patient.address} 
                                city={patient.city} 
                                patientType='mother' 
                                setActivePatient={PatientElementClickHandler} 
                                activePatientId={activePatientId}  
                                disabled={disabledPatients && disabledPatients.includes(patient.id)}
                                />
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