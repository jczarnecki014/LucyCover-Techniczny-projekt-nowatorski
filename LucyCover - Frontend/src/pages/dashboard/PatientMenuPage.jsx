import PatientMenu from "../../components/dashboard/patients/PatientMenu/PatientMenu";
import { queryClient } from "../../api/https";
import { fetchPatient } from "../../api/https";

/**
 * PatientMenuPage - Page to display menu for patient maintain options
 * 
 *
 * @component
 */

const PatientMenuPage = () => {
    return  (
        <PatientMenu />
    )
}

/**
 * Loader - function using to pre-loading chosen patient details before page load
 * 
 *
 * @function
 */

export const loader = async ({params}) => {
    const patientId = params.patientId
    
    return queryClient.fetchQuery({
        queryKey:["patients",patientId],
        queryFn: ({signal}) => fetchPatient({signal,patientId})                     
    })
}

export default PatientMenuPage;