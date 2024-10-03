import { useDispatch } from "react-redux";
import { SetActivePage } from "../../context/slices/MainMenuSlice";
import { useEffect } from "react";
import Messages from "../../components/dashboard/messages/message";


const MessagesPage = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(SetActivePage("messages"))
    },[])

    return <Messages />
}



export default MessagesPage