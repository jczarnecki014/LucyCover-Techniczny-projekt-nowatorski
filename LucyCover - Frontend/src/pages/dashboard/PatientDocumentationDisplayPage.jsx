import PatientDocumentationDisplay from "../../components/dashboard/patients/PatientDocumentation/PatientDocumentationDisplay/PatientDocumentationDisplay";
import { queryClient } from "../../api/https";
import { fetchDocumentationDetails } from "../../api/https";


const PatientDocumentationDisplayPage = () => {
    return  (
        <PatientDocumentationDisplay />
    )
}

export const loader = async ({params}) => {

    //it need refactor because of from backend we won't fetch botch first and next documentation list!!!!
    const patientId = params.patientId;
    const documentId = params.documentationId;

    return queryClient.fetchQuery({
        queryKey:['patients',patientId],
        queryFn: ({signal}) => fetchDocumentationDetails({signal,patientId,documentId})                     
    })
}

export default PatientDocumentationDisplayPage;