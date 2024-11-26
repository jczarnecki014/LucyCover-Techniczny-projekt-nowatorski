import PatientRecommendationDisplay from "../../components/dashboard/patients/PatientRecommendation/PatientRecommendationDisplay";
import {queryClient} from '../../api/https'
import { FetchRecommendationDetails } from "../../api/https";

/**
 * PatientRecommendationDisplayPage - Page to display details of specific recommendation
 * 
 *
 * @component
 */

const PatientRecommendationDisplayPage = () => {
    return  (
        <PatientRecommendationDisplay />
    )
}


/**
 * loader - function to fetch specific recommendation details before page load
 * 
 *
 * @function
 */

export const loader = async ({params}) => {
    const patientId = params.patientId
    const recommendationId = params.recommendationId
    return queryClient.fetchQuery({
        queryKey: ['recommendations',patientId],
        queryFn: ({signal}) => FetchRecommendationDetails({signal,patientId,recommendationId})
    })
}

export default PatientRecommendationDisplayPage;