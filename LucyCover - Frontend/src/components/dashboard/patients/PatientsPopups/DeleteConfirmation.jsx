import Popup from '../../../utility/Popup';

const DeleteConfirmation = ({what="X",day="X",patient="X"}) => {
    return (
        <Popup 
            type="warning" 
            description={`Czy jesteś pewien, że chcesz usunąć ${what} z dnia ${day} dotyczącą ${patient} ?`}
            AcceptAction={()=>{}} 
            CancleAction={()=>{}} 
            />
    )
}

export default DeleteConfirmation