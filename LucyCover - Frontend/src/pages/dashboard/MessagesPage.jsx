import { useDispatch } from "react-redux";
import { SetActivePage } from "../../context/slices/MainMenuSlice";
import { useEffect } from "react";
import Messages from "../../components/dashboard/messages/message";
import { GetPatientsForPatientsListInMessages, queryClient } from "../../api/https";


const MessagesPage = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(SetActivePage("messages"))
    },[])

    return <Messages />
}

export const loader = () => {
    return queryClient.fetchQuery({
        queryKey:['messages',"patientsList"],
        queryFn: ({signal}) => GetPatientsForPatientsListInMessages({signal})                     
    })
}


export default MessagesPage