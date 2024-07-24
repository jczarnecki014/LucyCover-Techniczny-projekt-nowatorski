import PatientMenu from "../../components/dashboard/patients/PatientMenu/PatientMenu";
import { queryClient } from "../../api/https";
import { fetchPatient } from "../../api/https";
import { redirect } from "react-router-dom";

const PatientMenuPage = () => {
    return  (
        <PatientMenu />
    )
}

export const loader = async ({params}) => {
    const patientId = params.patientId
    
    return queryClient.fetchQuery({
        queryKey:["patients",patientId],
        queryFn: ({signal}) => fetchPatient({signal,patientId})                     
    })
}

export default PatientMenuPage;