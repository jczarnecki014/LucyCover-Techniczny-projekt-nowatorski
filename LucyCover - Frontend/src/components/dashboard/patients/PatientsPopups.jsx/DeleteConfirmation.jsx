import style from './css/DeleteConfirmation.module.css'
import OverlayModel from '../../../utility/OverlayModel'

import { IoIosWarning } from "react-icons/io";

const DeleteConfirmation = ({what="test",day="test",patient="test"}) => {
    return (
        <OverlayModel title="Usuń dokumentację" smallSize>
            <div className={style.Container}>
                <IoIosWarning color='#EE7700' size={100} />
                <h2>Uwaga!</h2>
                <p>Czy jesteś pewien, że chcesz usunąć {what} z dnia <span className={style.DaySpan}>{day}</span> dotyczącą <span className={style.PatientSpan}>{patient}</span> ?</p>
                <p className={style.RedWarning}>Operacja ta jest nie odwracalna i nie ma możliwości przywrócenia tej dokumentacji do systemu !</p>
            </div>
        </OverlayModel>
    )
}

export default DeleteConfirmation