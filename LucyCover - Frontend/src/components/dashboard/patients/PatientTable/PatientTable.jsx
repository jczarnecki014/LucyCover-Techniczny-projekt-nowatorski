import style from './css/PatientTable.module.css'

const PatientTable = ({columns,data,patientName,children,showPopup}) => {

    return (
        <div className={style.Container}>
            <div className={style.DocumentationHeader}>
                <h5>{patientName}</h5>
                <button onClick={()=>showPopup('AddingForm')}>
                    Dodaj
                </button>
            </div>
            <div className={style.DocumentationList}>
              <table className={style.PatientTable}>
                <thead>
                  <tr>
                    {columns.map((label,index) => (
                      <th key={index}>{label}</th>
                    ))}
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {children(data)}
                </tbody>
              </table>
            </div>
        </div>
    )
}

export default PatientTable