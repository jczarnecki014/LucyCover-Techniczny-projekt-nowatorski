import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { OverlayToggle } from '../../../context/slices/OverlayModel_SLICE';
import { queryClient } from '../../../api/https';
import Popup from '../Popup';

const DeleteConfirmation = ({what,day,patient,elementId,deleteAction,redirect,queries}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {mutate,isSuccess,isError,error} = useMutation({
        mutationFn: deleteAction,
        onSuccess: () => {
            queryClient.invalidateQueries(queries)
            if(redirect) {
                setTimeout(()=>{
                    navigate(redirect)
                },2000)
            }
        },
        onError: (error) => {
            console.error(error)
        }
    })
    return (
        <>
            {(
                !isSuccess && !isError && 
                    <Popup 
                        type="warning" 
                        description={`Czy jesteś pewien, że chcesz usunąć ${what} z dnia ${day} dotyczącą ${patient} ?`}
                        AcceptAction={()=>{mutate({elementId})}} 
                        CancleAction={()=>{dispatch(OverlayToggle(false))}} />
            )}
            {(
                isSuccess && 
                    <Popup 
                        type="success" 
                        description="Operacja powiodła się."
                        additionalInfo={redirect && `Proszę czekać, trwa przekierowanie`} 
                    />
            )}
            {(
                isError && 
                    <Popup 
                        type="error" 
                        description={error.message} 
                    />
            )}      
        </>
    )
}

export default DeleteConfirmation