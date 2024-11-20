import {fetchDocumentation, queryClient} from '../../api/https'
import PatientDocumentationList from "../../components/dashboard/patients/PatientDocumentation/PatientDocumentationList/PatientDocumentationList";

/**
 * PatientDocumentationPage - Page to maintain medical documentation of chosen patient
 * 
 *
 * @component
 */

const PatientDocumentationPage = () => {
    return  (
        <PatientDocumentationList />
    )
}

/**
 * loader - function to fetching available patient documentation list before page load
 * 
 *
 * @function
 */

export const loader = async ({params}) => {
    const patientId = params.patientId

    return queryClient.fetchQuery({
        queryKey:['documentation'],
        queryFn: ({signal}) => fetchDocumentation({signal,patientId})
    })
}

export default PatientDocumentationPage;