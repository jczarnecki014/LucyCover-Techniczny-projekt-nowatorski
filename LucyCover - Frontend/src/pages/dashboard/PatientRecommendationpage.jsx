import PatientRecommendation from "../../components/dashboard/patients/PatientRecommendation/PatientRecommendation";

import { DUMMY_RECOMMENDATION } from "../../assets/DUMMY_DATA/DUMMY_RECOMMENDATION";
import { DUMMY_PATIENTS } from "../../assets/DUMMY_DATA/DUMMY_PATIENTS";

const PatientRecommendationPage = () => {
    return  (
        <PatientRecommendation />
    )
}

export const loader = async ({params}) => {
    const recommendation = DUMMY_RECOMMENDATION.filter(recommendation => recommendation.patientId === params.patientId)
    const patient = DUMMY_PATIENTS.find(patient => patient.id === params.patientId)
    return {
        recommendation,
        patientName: `${patient.firstName} ${patient.lastName}`
    };
}

export default PatientRecommendationPage;