import { useMutation } from "@tanstack/react-query"
import { createNewDocumentation } from "../api/https/"
import { queryClient } from "../api/https"

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