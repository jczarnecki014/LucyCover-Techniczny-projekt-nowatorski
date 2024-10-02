import { AnimatePresence } from 'framer-motion'
import style from '../css/PatientVisitsTable.module.css'
import PatientVisitElement from './PatientVisitElement'

const PatientVisitsTable = ({visits,deletePopupInvoke,editVisitPopupInvoke,addNewVisitPopupInvoke,isPending,isSchedulePage}) => {
    return (
        <div className={style.Container}>
            <table className={`${style.VisitTable}`}>
                <thead>
                    <tr>
                        {
                            isSchedulePage ? <th>Pacjent:</th> : <th>Data:</th>
                        }
                        <th>Godz:</th>
                        <th>Stan wizyty:</th>
                        <th className={style.AddButtonCol}>
                            <button onClick={()=>addNewVisitPopupInvoke()}>Dodaj</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {isPending && <tr className={style.Loading}><td><p>Trwa ładowanie...</p></td></tr> }
                {!isPending &&
                ( visits.map((visit)=> 
                {
                    return (
                       <PatientVisitElement 
                            key={visit.id} 
                            visit={visit} 
                            isSchedulePage={isSchedulePage}
                            deletePopupInvoke={deletePopupInvoke} 
                            editVisitPopupInvoke={editVisitPopupInvoke}  />
                    )
                }
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default PatientVisitsTable