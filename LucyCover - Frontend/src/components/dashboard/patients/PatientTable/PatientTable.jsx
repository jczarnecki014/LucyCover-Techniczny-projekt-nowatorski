import style from './css/PatientTable.module.css'

import { useDispatch } from 'react-redux'
import { OverlayToggle } from '../../../../context/slices/OverlayModel_SLICE'

const PatientTable = ({columns,data,patientName,children}) => {

    const dispatch = useDispatch()

    const onClickHandler = () => {
        dispatch(OverlayToggle(true))
    }

    return (
        <div className={style.Container}>
            <div className={style.DocumentationHeader}>
                <h5>{patientName}</h5>
                <button onClick={onClickHandler}>
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