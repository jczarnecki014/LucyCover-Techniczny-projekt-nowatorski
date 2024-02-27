import style from './css/PatientPage.module.css'

const PatientLayoutRightSide = ({children}) => {
    return (
        <div className={style.PatientRightSide}>
            {children}
        </div>
    )
}

export default PatientLayoutRightSide;