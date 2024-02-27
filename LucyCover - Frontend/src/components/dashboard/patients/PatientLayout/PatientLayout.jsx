import style from './css/PatientPage.module.css'

import PatientLayoutLeftSide from './PatientLayoutLeftSide'
import PatientLayoutRightSide from './PatientLayoutRightSide'

const PatientLayout = ({children}) => {
    return (
        <div className={style.Container}>
            {children}
        </div>
    )
}

PatientLayout.LeftSide = PatientLayoutLeftSide;
PatientLayout.RightSide = PatientLayoutRightSide;

export default PatientLayout;