import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import style from '../css/Message.module.css'
import MessageElement from './MessageElement'
import { GetMessagesForEmailAddress, SendNewMessage } from '../../../../api/https'
import LoadingSpinner from '../../../utility/LoadingSpinner'
import useDebouncedValue from '../../../../hooks/useDebouncedValue'

const MessagesContainer = ({activeEmail}) => {
    const messageArea = useRef();
    const [emails,setEmails] = useState([]);
    const debouncedEmal = useDebouncedValue(activeEmail,1000);

    const {data,isLoading,isSuccess,isError,} = useQuery({
        queryKey: ["messages",debouncedEmal],
        queryFn: ({signal}) => GetMessagesForEmailAddress({signal,email:activeEmail}),
        enabled: debouncedEmal != null,
    });

    const {mutate} = useMutation({
        mutationFn: SendNewMessage,
        onSuccess: (date) => {
            setEmails((previousState)=>{
                return [date,...previousState]
            })
            messageArea.current.value = ""
        },
        onError: (error) => {
            console.log(error)
        }
    });


    const OnKeyDownHandler = (event) => {
        if(event.keyCode == 13 && !event.shiftKey){
            const requestObject = {
                message: messageArea.current.value,
                patientEmail: activeEmail
            }
            mutate(requestObject)
        }
    }

    useEffect(()=>{
        setEmails(data != undefined ? data : [] )
    },[data])

    return (
        <div className={style.MessagesContainer}>
            <div id={isLoading ? style.isLoading: ""} className={style.MessageList}>
                {
                    isLoading && <LoadingSpinner />
                }
                {
                    isError && <h4 style={{color:"#D00000"}}>Podczas pobierania wiadomości wystąpił błąd.</h4>
                }
                {
                    (isSuccess && emails.length == 0) && <h4>Brak wiadomości do wyświetlenia</h4>
                }
                {
                    (isSuccess && emails.length > 0) && emails.map((message,index)=> {
                        return <MessageElement 
                                    key={index} 
                                    fromSystem={message.fromSystem} 
                                    date={message.reciveDate} 
                                    message={message.message} />
                    })
                }
            </div>
            <div className={style.NewMessage}>
                <textarea placeholder={"Napisz wiadomość do użytkownika..."} rows={4} onKeyDown={OnKeyDownHandler} ref={messageArea} ></textarea>
            </div>
        </div>
    )
}

export default MessagesContainer
