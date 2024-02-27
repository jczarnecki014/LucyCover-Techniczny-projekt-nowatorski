import style from './css/TableButtons.module.css'

const TableButtons = () => {
    return (
        <td className={style.ButtonSection}>
            <button id={style.Show}>Zobacz</button>
            <button id={style.Delete}>Usuń</button>
        </td>
    )
}

export default TableButtons