import { useDispatch,useSelector } from 'react-redux'
import { SetActiveChildren } from '../../../../context/slices/PatientSearch_SLICE'
import PatientSearchList from "./PatientSearchList"
import PatientElement from "../../patients/PatientsList/PatientSearch/PatientElement"

const ChooseChildrenList = ({activePatient,formModeChange}) => {
    //Change to API request
    const {children} = activePatient

    const dispatch = useDispatch();
    const activeChildrenId = useSelector(state => state.patientSearch.activeChildren.id);
    
    const PatientElementClickHandler = (id) => {
        const selectedPatient = children.find((patient) => patient.id === id);
        dispatch(SetActiveChildren(selectedPatient))
    }

    return (
            <PatientSearchList listElements={children} closeFunc={()=>formModeChange('visitFormMode')} >
                {
                    (children) => (
                        <PatientElement key={children.id} id={children.id} firstName={children.childFirstName} lastName={children.childLastName} birthDate={children.childBirthDate} patientType='children' setActivePatient={PatientElementClickHandler} activePatientId={activeChildrenId} />
                    )
                }
            </PatientSearchList>
    )
}

export default ChooseChildrenList