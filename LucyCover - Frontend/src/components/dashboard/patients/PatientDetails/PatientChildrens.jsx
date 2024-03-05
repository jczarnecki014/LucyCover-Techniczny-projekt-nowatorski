import style from './css/PatientDetails.module.css'

import { FaUser } from "react-icons/fa";

const PatientChildrens = ({children=[]}) => {
    return (
        <div id={style.PatientChildrens} className={style.DetailBlock}>
            <h5>Dzieci</h5>
            <div className={style.ChildrenList}>
                {children.map((child) => (
                    <div key={child.id} className={style.ChildrenElement}>
                        <div className={style.Icon}>
                            <FaUser size={40} />
                        </div>
                        <h6>{child.firstName} {child.lastName}</h6>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default PatientChildrens