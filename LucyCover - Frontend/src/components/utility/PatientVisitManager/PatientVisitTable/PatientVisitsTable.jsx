//Components
import PatientVisitElement from './PatientVisitElement'
//Style
import style from '../css/PatientVisitsTable.module.css'


/**
 * PatientVisitsTable - Component as PatientVisitWrapper children. It displays table with scheduled visits
 * 
 * Props:
 * 
 * @param {Array} visits - Visits to display 
 * @param {Function} deletePopupInvoke - function which will be invoke when user click on trash icon
 * @param {Function} editVisitPopupInvoke -function which will be invoke when user click on edit icon
 * @param {Function} addNewVisitPopupInvoke - function which will be invoke when user click "dodaj" button
 * @param {boolean} isPending - display information when isPending = true (when some request is proccessing)
 * @param {boolean} isSchedulePage - if isSchedulePage is true first column displays information about patient if false it displays date
 * @returns 
 */

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