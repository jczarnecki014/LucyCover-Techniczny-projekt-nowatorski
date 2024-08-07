import PatientSchedule from "../../components/dashboard/patients/PatientSchedule/PatientSchedule";
import { queryClient } from "../../api/https";
import { fetchAllPatientVisits } from "../../api/https";

const PatientSchedulePage = () => {
    return  (
        <PatientSchedule />
    )
}

export const loader = async ({params}) => {
    const patientId = params.patientId;
    return queryClient.fetchQuery({
        queryKey: ['schedule'],
        queryFn: ({signal}) => fetchAllPatientVisits({signal,patientId})
    })
}

export default PatientSchedulePage;