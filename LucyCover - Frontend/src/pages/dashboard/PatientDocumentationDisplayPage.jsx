import PatientDocumentationDisplay from "../../components/dashboard/patients/PatientDocumentation/PatientDocumentationDisplay/PatientDocumentationDisplay";

import { DUMMY_DOCUMENTATION } from "../../assets/DUMMY_DATA/DUMMY_DOCUMENTATION";
import { DUMMY_DOCUMENTATION_FIRST } from "../../assets/DUMMY_DATA/DUMMY_DOCUMENTATION_FIRST";


const PatientDocumentationDisplayPage = () => {
    return  (
        <PatientDocumentationDisplay />
    )
}

export const loader = async ({params}) => {
    const documentId = params.documentationId;
    const documentDetailsId = DUMMY_DOCUMENTATION.find(document => (document.id === documentId )).documentId

    const documentationDetails = DUMMY_DOCUMENTATION_FIRST.find(document => (document.id === documentDetailsId ))

    return documentationDetails
}

export default PatientDocumentationDisplayPage;