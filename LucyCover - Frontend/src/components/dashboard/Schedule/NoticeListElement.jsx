import style from './css/Schedule.module.css'
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

const NoticeListElement = ({details}) => {
    const {status,description} = details
    let statusClassName = style.Info;
    switch (status) {
        case "info":
            statusClassName = style.Info
        break;
        case "uwaga":
            statusClassName = style.Warn
        break;
    }
    return (
        <li id={statusClassName} className={style.NoticeElement}>
            <div className={style.NoticeStatus}>{status.toUpperCase()}</div>
            <div className={style.NoticeContent}> 
                {description}
                <div className={style.ActionButtons}>
                    <FaRegTrashAlt size={20} />
                    <FaRegEdit size={20} />
                </div>
            </div>
        </li>
    )
}

export default NoticeListElement;