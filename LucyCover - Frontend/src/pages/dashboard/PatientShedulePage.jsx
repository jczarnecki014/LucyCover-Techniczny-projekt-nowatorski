import PatientSchedule from "../../components/dashboard/patients/PatientSchedule/PatientSchedule";
import { queryClient } from "../../api/https";
import { fetchAllPatientVisits } from "../../api/https";

/**
 * PatientSchedulePage - Page to display scheduled visist for specific patient
 * 
 *
 * @component
 */

const PatientSchedulePage = () => {
    return  (
        <PatientSchedule />
    )
}

/**
 * loader - function to fetch scheduled visits before page load
 * 
 *
 * @component
 */

export const loader = async ({params}) => {
    const patientId = params.patientId;
    return queryClient.fetchQuery({
        queryKey: ['schedule'],
        queryFn: ({signal}) => fetchAllPatientVisits({signal,patientId})
    })
}

export default PatientSchedulePage;