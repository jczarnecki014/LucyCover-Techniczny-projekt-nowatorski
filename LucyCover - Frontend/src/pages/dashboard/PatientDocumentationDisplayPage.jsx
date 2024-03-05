import PatientDocumentationDisplay from "../../components/dashboard/patients/PatientDocumentation/PatientDocumentationDisplay/PatientDocumentationDisplay";

import { DUMMY_DOCUMENTATION } from "../../assets/DUMMY_DATA/DUMMY_DOCUMENTATION";
import { DUMMY_DOCUMENTATION_FIRST } from "../../assets/DUMMY_DATA/DUMMY_DOCUMENTATION_FIRST";
import { DUMMY_DOCUMENTATION_NEXT} from "../../assets/DUMMY_DATA/DUMMY_DOCUMENTATION_NEXT"


const PatientDocumentationDisplayPage = () => {
    return  (
        <PatientDocumentationDisplay />
    )
}

export const loader = async ({params}) => {

    //it need refactor because of from backend we won't fetch botch first and next documentation list!!!!

    const documentId = params.documentationId;

    //document.first = true <--- first visit documentation
    //document.first = false <--- next visit documentation
    const documentation = DUMMY_DOCUMENTATION.find(document => (document.id === documentId ))

    let documentationDetailsList;

    if(documentation.first) {
        documentationDetailsList = DUMMY_DOCUMENTATION_FIRST
    }
    else {
        documentationDetailsList = DUMMY_DOCUMENTATION_NEXT
    }

    const documentationDetails = documentationDetailsList.find(document => (document.id === documentation.documentId ))

    //moze documentation details przeslemy do contextu ?

    return {
        documentation,
        documentationDetails,
    }
}

export default PatientDocumentationDisplayPage;