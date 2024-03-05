import style from './css/PatientDetails.module.css'

import { Link } from 'react-router-dom'

const PatientHeader = ({id,firstName,lastName}) => {
    return (
        <div className={style.PatientHeader}>
            <h5>{firstName} {lastName}</h5>
            <button>
                <Link to={id}>
                    <button>Wyświetl</button>
                </Link>
            </button>
        </div>
    )
}
export default PatientHeader