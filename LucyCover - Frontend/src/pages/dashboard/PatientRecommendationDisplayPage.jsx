import { DUMMY_RECOMMENDATION } from "../../assets/DUMMY_DATA/DUMMY_RECOMMENDATION";
import { DUMMY_PATIENTS } from "../../assets/DUMMY_DATA/DUMMY_PATIENTS";
import PatientRecommendationDisplay from "../../components/dashboard/patients/PatientRecommendation/PatientRecommendationDisplay";

const PatientRecommendationDisplayPage = () => {
    return  (
        <PatientRecommendationDisplay />
    )
}

export const loader = async ({params}) => {
    const recommendation = DUMMY_RECOMMENDATION.find(recommendation => recommendation.id === params.recommendationId)
    const patient = DUMMY_PATIENTS.find(patient => patient.id === recommendation.patientId)
    return {
        recommendation,
        patientName: `${patient.firstName} ${patient.lastName}`
    };
}

export default PatientRecommendationDisplayPage;