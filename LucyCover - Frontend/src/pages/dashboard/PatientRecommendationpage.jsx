import PatientRecommendation from "../../components/dashboard/patients/PatientRecommendation/PatientRecommendation";
import { queryClient } from "../../api/https";
import { fetchRecommendation } from "../../api/https";

const PatientRecommendationPage = () => {
    return  (
        <PatientRecommendation />
    )
}


export const loader = async ({params}) => {
    const patientId = params.patientId;
    return queryClient.fetchQuery({
        queryKey: ['recommendations'],
        queryFn: ({signal}) => fetchRecommendation({signal,patientId})
    })
}

// export const loader = async ({params}) => {
//     const recommendation = DUMMY_RECOMMENDATION.filter(recommendation => recommendation.patientId === params.patientId)
//     const patient = DUMMY_PATIENTS.find(patient => patient.id === params.patientId)
//     return {
//         recommendation,
//         patientName: `${patient.firstName} ${patient.lastName}`
//     };
// }

export default PatientRecommendationPage;