import Popup from '../../../utility/Popup';

const DeleteConfirmation = ({what="test",day="test",patient="test"}) => {
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