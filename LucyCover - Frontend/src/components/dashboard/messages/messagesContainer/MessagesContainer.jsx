import style from '../css/Message.module.css'
import MessageElement from './MessageElement'

const MessagesContainer = () => {

    const OnKeyDownHandler = (event) => {
        if(event.keyCode == 13){
            alert("dzialam")
        }
    }

    return (
        <div className={style.MessagesContainer}>
            <div className={style.MessageList}>
                <MessageElement id={style.SystemMessage} />
                <MessageElement id={style.PatientMessage} />
                <MessageElement id={style.SystemMessage} />
                <MessageElement id={style.SystemMessage} />
            </div>
            <div className={style.NewMessage}>
                <textarea placeholder="Napisz wiadomość do użytkownika..." rows={4} onKeyDown={OnKeyDownHandler} ></textarea>
            </div>
        </div>
    )
}

export default MessagesContainer