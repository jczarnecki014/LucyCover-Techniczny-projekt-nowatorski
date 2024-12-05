//Components
import PatientSearchList from "./PatientSearchList"
import PatientElement from '../../dashboard/patients/PatientsList/PatientSearch/PatientElement'
//Hooks
import { useDispatch,useSelector } from 'react-redux'
//Store
import { SetActiveChildren } from '@context/slices/PatientSearch_SLICE'

/**
 * ChooseChildrenList - Component to display patient children search box
 * 
 *  This is children componenent for VisitManager
 * 
 * Props:
 * 
 * @param {object} activePatient - Patient which children should be displayed
 * @param {Function} FormModeChange - Function to changing mode of form state 
 */

const ChooseChildrenList = ({activePatient,FormModeChange}) => {
    //Change to API request
    const {children} = activePatient

    const dispatch = useDispatch();
    const activeChildrenId = useSelector(state => state.patientSearch.activeChildren.id);
    
    const PatientElementClickHandler = (id) => {
        const selectedPatient = children.find((patient) => patient.id === id);
        dispatch(SetActiveChildren(selectedPatient))
    }

    return (
            <PatientSearchList listElements={children} closeFunc={()=>FormModeChange('visitFormMode')} >
                {
                    (children) => (
                        <PatientElement key={children.id} id={children.id} firstName={children.childFirstName} lastName={children.childLastName} birthDate={children.childBirthDate} patientType='children' setActivePatient={PatientElementClickHandler} activePatientId={activeChildrenId} />
                    )
                }
            </PatientSearchList>
    )
}

export default ChooseChildrenList