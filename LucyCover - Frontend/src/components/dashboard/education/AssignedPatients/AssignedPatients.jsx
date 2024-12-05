//Components
import PatientTail from './PatientTail';
import { FaCirclePlus } from "react-icons/fa6";
//style
import style from '../css/Education.module.css'
//Hooks
import { useDispatch } from 'react-redux';
//Store
import { OverlayToggle } from "@context/slices/OverlayModel_SLICE";

/**
 * AssignedPatients - Component to displaying assigned patients to material
 * 
 * Education <- Parent component
 * 
 * Functionality: 
 * 
 *  [1] - Displaying patients as PatientTail.jsx
 * 
 *  Params:
 * 
 *  @param {Array} patients - Collection of patients to display
 * 
 *  @param {function} SetPatientSearchMode - Function to invoke when adding tail is clicked
 * 
 * @param {object} activeMaterial - object contain selected material object
 */

const AssignedPatients = ({patients,SetPatientSearchMode,activeMaterial}) => {
    const dispatch = useDispatch();

    const OnClickHandler = () => {
        dispatch(OverlayToggle(true))
        SetPatientSearchMode()
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