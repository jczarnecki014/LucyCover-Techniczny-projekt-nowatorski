import { useDispatch } from "react-redux";
import { SetActivePage } from "../../context/slices/MainMenuSlice";
import { useEffect } from "react";
import Messages from "../../components/dashboard/messages/message";
import { GetPatientsForPatientsListInMessages, queryClient } from "../../api/https";

/**
 * MessagesPage - Page to display mail correspondence between patient and user.
 * This page also provide option to post email messages via this application
 *
 * @component
 */

const MessagesPage = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(SetActivePage("messages"))
    },[])

    return <Messages />
}

/**
 * loader - function to fetch available patient list before page load
 * 
 *
 * @function
 */

export const loader = () => {
    return queryClient.fetchQuery({
        queryKey:['messages',"patientsList"],
        queryFn: ({signal}) => GetPatientsForPatientsListInMessages({signal})                     
    })
}


export default MessagesPage