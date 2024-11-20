//Coponents
import PopupMenu from "../../../../utility/PatientsPopups/PatientPopupMenu"
import PatientDocumentationForm_FIRST from "../PatientDocumentationSections/FirstDocumentationSections/PatientDocumentationForm_FIRST"
import PatientDocumentationForm_NEXT from "../PatientDocumentationSections/NextDocumentationSections/PatientDocumentationForm_NEXT"
//Hooks
import { useState } from "react"

/**
 * AddPatientDocumentation - component works as menu. User can choose which type of documentation would like to display
 * 
 * Functionality: 
 * 
 *  [1] - Displaying menu of avaiable documentation
 * 
 *  [2] - Displaying choosen form
 * 
 */

const AddPatientDocumentation = ({patientId,patientData}) => {
    const [formMode,setFormMode] = useState('menu')
    const FormModeChangeHandler = (mode) => { 
        setFormMode(mode)
    }
    
    return (
        <>
            {formMode === 'menu' && <PopupMenu 
                                        title="Dodaj nową dokumentację" 
                                        header="Wybierz rodzaj wprowadzanej dokumentacji" 
                                        leftBtn={{desc:'Pierwszorazowa wizyta',func:FormModeChangeHandler}}
                                        rightBtn={{desc:'Kolejna wizyta (domowa)',func:FormModeChangeHandler}} 
                                        />}
            {formMode === 'FirstDocumentation' && <PatientDocumentationForm_FIRST 
                                                    patientId={patientId} 
                                                    childrenList={patientData.children} />}
            {formMode === 'NextDocumentation' && <PatientDocumentationForm_NEXT 
                                                    patientId={patientId} 
                                                    childrenList={patientData.children} />}
        </>
    )
}

export default AddPatientDocumentation