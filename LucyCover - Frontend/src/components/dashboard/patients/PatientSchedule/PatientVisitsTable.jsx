import style from './css/PatientVisitsTable.module.css'
import PatientVisitElement from './PatientVisitElement'

const PatientVisitsTable = ({visits,deletePopupInvoke,editVisitPopupInvoke,addNewVisitPopupInvoke}) => {
    return (
        <div className={style.Container}>
            <table className={style.VisitTable}>
                <thead>
                    <tr>
                        <th>Data:</th>
                        <th>Godz:</th>
                        <th>Stan wizyty:</th>
                        <th className={style.AddButtonCol}>
                            <button onClick={()=>addNewVisitPopupInvoke()}>Dodaj</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {visits.map((visit)=> 
                {
                    return (
                       <PatientVisitElement 
                            key={visit.id} 
                            visit={visit} 
                            deletePopupInvoke={deletePopupInvoke} 
                            editVisitPopupInvoke={editVisitPopupInvoke}  />
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default PatientVisitsTable