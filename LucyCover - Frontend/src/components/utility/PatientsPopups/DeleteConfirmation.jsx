import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { OverlayToggle } from '../../../context/slices/OverlayModel_SLICE';
import { queryClient } from '../../../api/https';
import Popup from '../Popup';

const DeleteConfirmation = ({what,day,childName,elementId,deleteAction,redirect,queries}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {mutate,isSuccess,isError} = useMutation({
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
                        description={`Czy jesteś pewien, że chcesz usunąć ${what} z dnia ${day} dotyczącą ${childName} ?`}
                        AcceptAction={()=>{mutate({documentId:elementId})}} 
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
                        description="Usuwanie dokumentacji nie powiodło się. Proszę spróbować jeszcze raz, lub zgłosić problem administratorowi systemu." 
                    />
            )}      
        </>
    )
}

export default DeleteConfirmation