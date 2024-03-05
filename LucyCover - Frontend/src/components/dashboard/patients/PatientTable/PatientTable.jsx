import style from './css/PatientTable.module.css'


const PatientTable = ({columns,data,patientName,children}) => {

    return (
        <div className={style.Container}>
            <div className={style.DocumentationHeader}>
                <h5>{patientName}</h5>
                <button>
                    Dodaj
                </button>
            </div>
            <div className={style.DocumentationList}>
              <table>
                <thead>
                  <tr>
                    {columns.map((label) => (
                      <th>{label}</th>
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