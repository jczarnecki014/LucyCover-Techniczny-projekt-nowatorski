import style from './css/AddNewVisit.module.css'
import { useMutation } from '@tanstack/react-query'
import { ChangeVisitStatus } from '../../../../api/https'
import { queryClient } from '../../../../api/https'

const VisitStatusButtonSection = ({visitId,visitStatus,SetFormDisplayHandler}) => {

    const {mutate} = useMutation({
        mutationFn: ChangeVisitStatus,
        onSuccess: () => {
            console.log(queryClient)
            queryClient.invalidateQueries(['schedule'])
            SetFormDisplayHandler("visitNotyfication");
        },
        onError: (error) => {
            SetFormDisplayHandler("error")
        }
    })

    const StatusChangeHandler = (visitStatus) => {
        mutate({visitId,visitStatus})
    }

    const scheduleButton = <button id={style.Scheduled} type="button" onClick={()=>StatusChangeHandler("Zaplanowana")}>Zaplanowana</button>
    const doneButton = <button id={style.Done} type="button" onClick={()=>StatusChangeHandler("Odbyta")} >Odbyta</button> 
    const rejectedButton = <button id={style.Rejected} type="button" onClick={()=>StatusChangeHandler("Odwolana")}>Odwołaj</button>

    return (
        <>
            {
                visitStatus === 'Zaplanowana' && 
                <>
                    {doneButton} {rejectedButton}
                </>
            }
            {
                visitStatus === 'Odwolana' && 
                <>
                    {doneButton} {scheduleButton}
                </>
            }
            {
                visitStatus === 'Odbyta' && 
                <>
                    {rejectedButton} {scheduleButton}
                </>
            }
        </>
    )
}

export default VisitStatusButtonSection