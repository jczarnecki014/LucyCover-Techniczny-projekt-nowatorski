import style from '../css/Message.module.css'

const MessageElement = ({message,date,fromSystem}) => {

    // const test = message && new TextEncoder().encode(message)

    return (
        <div id={fromSystem ? style.SystemMessage : style.PatientMessage} className={style.MessageElement}>
            <div className={style.Message}>
                <h5>{fromSystem ? "Twoja wiadomość:" : "Pacjent pisze:"}</h5>
                <p className={style.MessageContent}>{message}</p>
                <div className={style.MessageTime}>{date}</div>
            </div>
        </div>
    )
}

export default MessageElement