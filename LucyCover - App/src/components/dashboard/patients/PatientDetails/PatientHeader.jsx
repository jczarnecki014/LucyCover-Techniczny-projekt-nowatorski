import style from '../css/PatientsWrapper.module.css'

const PatientHeader = ({firstName,lastName}) => {
    return (
        <div className={style.PatientHeader}>
            <h5>{firstName} {lastName}</h5>
            <button>Wyświetl</button>
        </div>
    )
}
export default PatientHeader