import style from './css/TableButtons.module.css'

import { Link } from 'react-router-dom'

const TableButtons = ({showPopup,document}) => {

    const {id,date,child} = document;

    return (
        <td className={style.ButtonSection}>
            <button id={style.Show}>
                <Link to={`${id}`}>Zobacz</Link>
            </button>
            <button id={style.Delete} onClick={()=>showPopup('DeleteConfirmation',{elementId:id,day:date,patient:child})} >
                Usuń
            </button>
        </td>
    )
}

export default TableButtons