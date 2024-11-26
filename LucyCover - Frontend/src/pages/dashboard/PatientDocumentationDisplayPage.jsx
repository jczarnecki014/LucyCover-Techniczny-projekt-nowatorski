import PatientDocumentationDisplay from "../../components/dashboard/patients/PatientDocumentation/PatientDocumentationDisplay/PatientDocumentationDisplay";
import { queryClient } from "../../api/https";
import { FetchDocumentationDetails } from "../../api/https";

/**
 * PatientDocumentationDisplayPage - Page to display chosen documentation details
 * 
 *
 * @component
 */

const PatientDocumentationDisplayPage = () => {
    return  (
        <PatientDocumentationDisplay />
    )
}


/**
 * loader - function to fetch chosen documentation details before page load
 * 
 *
 * @function
 */

export const loader = async ({params}) => {
    const patientId = params.patientId;
    const documentId = params.documentationId;

    return queryClient.fetchQuery({
        queryKey:['documentation',patientId],
        queryFn: ({signal}) => FetchDocumentationDetails({signal,patientId,documentId})                     
    })
}

export default PatientDocumentationDisplayPage;