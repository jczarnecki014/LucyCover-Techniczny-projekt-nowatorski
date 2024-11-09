import { useMutation } from "@tanstack/react-query"
import { createNewDocumentation } from "../api/https/"
import { queryClient } from "../api/https"

/**
 * useFetchDocumentation - Function to fetching patient visit documentation to api 

 * @returns 
        fetchDocumentation, - function to mutate action
        isPending, - info about processing mutation
        isError, - true if processing failed
        isSuccess, - true if processing ok

 */

const useFetchDocumentation = (patientId) => {

    const {mutate,isPending,isError,isSuccess} = useMutation({
        mutationFn: createNewDocumentation,
        onMutate: () => {
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['Documentation'])
        },
        onError: (error) => {
            console.error(error)
        }
    })

    const fetchDocumentation = (firstVisitDocumentation,formInputs,documentationId) => {
        const dataToFetch = {
            DocumentationId: documentationId,
            First: firstVisitDocumentation,
            ChildId: formInputs.patientChildId,
            Date: formInputs.visitDate,
            DocumentationFirstVisit: firstVisitDocumentation ? formInputs : undefined,
            DocumentationNextVisit: !firstVisitDocumentation ? formInputs : undefined
        }
        console.log(patientId)
        mutate({documentationDetails:dataToFetch,patientId:patientId})
    }

    return {
        fetchDocumentation,
        isPending,
        isError,
        isSuccess,
    }
}

export default useFetchDocumentation