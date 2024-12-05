import PatientRecommendation from "@components/dashboard/patients/PatientRecommendation/PatientRecommendation";
import { queryClient } from "@api/https";
import { FetchRecommendation } from "@api/https";

/**
 * PatientRecommendationPage - Page to display recommendation available list 
 * 
 *
 * @component
 */

const PatientRecommendationPage = () => {
    return  (
        <PatientRecommendation />
    )
}

/**
 * loader - Function used for fetch available recommendation list before page load
 * 
 *
 * @function
 */

export const loader = async ({params}) => {
    const patientId = params.patientId;
    return queryClient.fetchQuery({
        queryKey: ['recommendations'],
        queryFn: ({signal}) => FetchRecommendation({signal,patientId})
    })
}

export default PatientRecommendationPage;