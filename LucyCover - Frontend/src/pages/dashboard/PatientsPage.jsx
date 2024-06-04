import Patients from "../../components/dashboard/patients/PatientsList/Patients";
import { queryClient } from "../../api/https";
import { fetchPatientsForSearchList } from "../../api/https";

const PatientsPage = () => {
    return <Patients />
}

export const loader = async () => {
    return queryClient.fetchQuery({
        queryKey: ['patients'],
        queryFn: ({signal}) => fetchPatientsForSearchList(signal)
    })
}


export default PatientsPage;