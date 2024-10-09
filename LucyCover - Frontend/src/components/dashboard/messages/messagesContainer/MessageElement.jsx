import style from '../css/Message.module.css'

const MessageElement = ({id}) => {
    return (
        <div id={id} className={style.MessageElement}>
            <div className={style.Message}>
                <h5>Wizyta dzień 09.10.2024</h5>
                <p className={style.MessageContent}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit minima fuga possimus architecto et dolorem nulla, sit porro corporis corrupti eum necessitatibus, praesentium commodi harum nihil amet, vero doloremque soluta?</p>
                <div className={style.MessageTime}>04.06.2023 18:23</div>
            </div>
        </div>
    )
}

export default MessageElement