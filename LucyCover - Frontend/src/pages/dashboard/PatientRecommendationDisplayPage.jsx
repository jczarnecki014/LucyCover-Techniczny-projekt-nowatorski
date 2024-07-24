import PatientRecommendationDisplay from "../../components/dashboard/patients/PatientRecommendation/PatientRecommendationDisplay";
import {queryClient} from '../../api/https'
import { fetchRecommendationDetails } from "../../api/https";

const PatientRecommendationDisplayPage = () => {
    return  (
        <PatientRecommendationDisplay />
    )
}

export const loader = async ({params}) => {
    const patientId = params.patientId
    const recommendationId = params.recommendationId
    return queryClient.fetchQuery({
        queryKey: ['recommendations',patientId],
        queryFn: ({signal}) => fetchRecommendationDetails({signal,patientId,recommendationId})
    })
}


// export const loader = async ({params}) => {
//     const recommendation = DUMMY_RECOMMENDATION.find(recommendation => recommendation.id === params.recommendationId)
//     const patient = DUMMY_PATIENTS.find(patient => patient.id === recommendation.patientId)
//     return {
//         recommendation,
//         patientName: `${patient.firstName} ${patient.lastName}`
//     };
// }

export default PatientRecommendationDisplayPage;