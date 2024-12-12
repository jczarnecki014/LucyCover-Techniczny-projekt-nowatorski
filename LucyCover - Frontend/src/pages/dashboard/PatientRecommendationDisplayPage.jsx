import PatientRecommendationDisplay from "@components/dashboard/patients/PatientRecommendation/PatientRecommendationDisplay";
import {queryClient} from '@api/https'
import { FetchRecommendationDetails } from "@api/https";

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
    const recommendationId = params.recommendationId
    return queryClient.fetchQuery({
        queryKey: ['recommendations',recommendationId],
        queryFn: ({signal}) => FetchRecommendationDetails({signal,recommendationId})
    })
}

export default PatientRecommendationDisplayPage;