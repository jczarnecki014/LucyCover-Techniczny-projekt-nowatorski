//Components
import Popup from '../Popup';
//Hooks
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//Store
import { OverlayToggle } from '@context/slices/OverlayModel_SLICE';
//Api
import { queryClient } from '@api/https';

/**
 * DeleteConfirmation - preconfigured popup component to display delete confirmation and status of processing and fetching delete request
 * 
 * Props:
 * 
 * @param {string} what - information what will be deleted (documentation / recommendation etc. )
 * @param {string} day - information about adding date of deleting item
 * @param {string} patient - value information about owner of deleting item
 * @param {string} elementId - deleting item identifier which will be used when specify resource will be searching on server
 * @param {Function} deleteAction - api endpoint connection function to backend resource which will be invoke after success confirmation
 * @param {string} redirect - addres (route / url) to redirect after deleteAction proccessing 
 * @param {string} queries - queries which should be updated in cache after deleteAction processing
 * @returns 
 */

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