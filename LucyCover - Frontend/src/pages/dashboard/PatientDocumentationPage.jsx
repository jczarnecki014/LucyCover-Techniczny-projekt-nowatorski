

import { DUMMY_DOCUMENTATION } from "../../assets/DUMMY_DATA/DUMMY_DOCUMENTATION";
import { DUMMY_PATIENTS } from "../../assets/DUMMY_DATA/DUMMY_PATIENTS";
import PatientDocumentation from "../../components/dashboard/patients/PatientDocumentation/PatientDocumentation";

const PatientDocumentationPage = () => {
    return  (
        <PatientDocumentation />
    )
}

export const loader = async ({params}) => {
    const documentation = DUMMY_DOCUMENTATION.filter(document => document.patientId === params.patientId)
    const patient = DUMMY_PATIENTS.find(patient => patient.id === params.patientId)
    return {
        documentation,
        patientName: `${patient.firstName} ${patient.lastName}`
    };
}

export default PatientDocumentationPage;