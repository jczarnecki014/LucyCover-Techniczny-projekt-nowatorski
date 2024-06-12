

import { DUMMY_DOCUMENTATION } from "../../assets/DUMMY_DATA/DUMMY_DOCUMENTATION";
import { DUMMY_PATIENTS } from "../../assets/DUMMY_DATA/DUMMY_PATIENTS";
import {fetchDocumentation, queryClient} from '../../api/https'
import PatientDocumentationList from "../../components/dashboard/patients/PatientDocumentation/PatientDocumentationList/PatientDocumentationList";

const PatientDocumentationPage = () => {
    return  (
        <PatientDocumentationList />
    )
}

export const loader = async ({params}) => {
    const patientId = params.patientId

    return queryClient.fetchQuery({
        queryKey:['documentation'],
        queryFn: ({signal}) => fetchDocumentation({signal,patientId})
    })
}

export default PatientDocumentationPage;