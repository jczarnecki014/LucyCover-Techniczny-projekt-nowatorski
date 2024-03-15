import style from './css/TableButtons.module.css'

import { Link } from 'react-router-dom'

const TableButtons = ({href}) => {
    return (
        <td className={style.ButtonSection}>
            <button id={style.Show}>
                <Link to={`${href}`}>Zobacz</Link>
            </button>
            <button id={style.Delete}>
                <Link>Usuń</Link>
            </button>
        </td>
    )
}

export default TableButtons