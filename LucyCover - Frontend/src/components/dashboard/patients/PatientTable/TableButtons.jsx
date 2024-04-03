import style from './css/TableButtons.module.css'

import { Link } from 'react-router-dom'

const TableButtons = ({showPopup,document}) => {

    const {id,date,patient} = document;

    return (
        <td className={style.ButtonSection}>
            <button id={style.Show}>
                <Link to={`${id}`}>Zobacz</Link>
            </button>
            <button id={style.Delete} onClick={()=>showPopup('DeleteConfirmation',{day:date,patient:patient})} >
                Usuń
            </button>
        </td>
    )
}

export default TableButtons