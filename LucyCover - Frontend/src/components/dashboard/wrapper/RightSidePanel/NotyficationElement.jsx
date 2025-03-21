//Componetns
import { FaEye } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
//Style
import style from '../css/Wrapper.module.css'

const NotyficationElement = ({title,description}) => {
    return ( 
        <li>
            <h6>{title}</h6>
            <hr />
            <p>{description}</p>
            <div className={style.NotyficationButtons}>
                <FaEye />
                <RiDeleteBin2Fill />
            </div>
        </li>
    )
}

export default NotyficationElement