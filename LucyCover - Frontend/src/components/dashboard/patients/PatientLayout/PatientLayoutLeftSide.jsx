import style from './css/PatientPage.module.css'

const PatientLayoutLeftSide = ({children,overflowY}) => {
    return (
        <div id={overflowY && style.Overflow_Y_auto} className={style.PatientLeftSide}>
            {children}
        </div>
    )
}

export default PatientLayoutLeftSide;