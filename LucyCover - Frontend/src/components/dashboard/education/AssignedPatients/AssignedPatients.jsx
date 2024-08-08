import style from '../css/Education.module.css'
import { FaCirclePlus } from "react-icons/fa6";
import PatientTail from './PatientTail';
import { OverlayToggle } from "../../../../context/slices/OverlayModel_SLICE";
import { useDispatch } from 'react-redux';

const AssignedPatients = ({patients,setPatientSearchMode,activeMaterial}) => {
    const dispatch = useDispatch();

    const OnClickHandler = () => {
        dispatch(OverlayToggle(true))
        setPatientSearchMode()
    }

    return (
        <div className={style.patientList}>
            {
                patients.map(patient => <PatientTail key={patient.patientId} firstName={patient.firstName} lastName={patient.lastName} city={patient.city} address={patient.address} /> )
            }
            {
                activeMaterial.id != null && (
                    <div id={style.addPatientTail} className={style.patient}>
                        <span className={style.patientIcon} onClick={OnClickHandler}>
                            <FaCirclePlus size={50} color="#fff" />
                        </span>
                        <span className={style.patientInfo}>
                            <h6>Dodaj osobę</h6>
                        </span>
                    </div>
                )
            }
    
            
        </div>
    )
}

export default AssignedPatients