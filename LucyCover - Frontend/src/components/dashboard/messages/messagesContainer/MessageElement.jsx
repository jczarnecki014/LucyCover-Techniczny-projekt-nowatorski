//Style
import style from '../css/Message.module.css'

/**
 * MessageElement - component to display message details
 * 
 * Functionality: 
 * 
 *  [1] - Displaying message details
 * 
 *  [2] - Displaying message in appropriate way depending on message sender
 * 
 * Params:
 * 
 *  @param {string} message - string with message information
 * 
 *  @param {string} date - string with message date information
 * 
 *  @param {boolean} fromSystem - boolean with information about sender (system / patient)
 */

const MessageElement = ({message,date,fromSystem}) => {

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