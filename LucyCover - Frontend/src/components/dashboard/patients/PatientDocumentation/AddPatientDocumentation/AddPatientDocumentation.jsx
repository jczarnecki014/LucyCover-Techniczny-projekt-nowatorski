import { useState } from "react"

import AddPatientDocumentation_MENU from "./AddPatientDocumentation_MENU"
import PatientDocumentationForm_FIRST from "../PatientDocumentationSections/FirstDocumentationSections/PatientDocumentationForm_FIRST"
import PatientDocumentationForm_NEXT from "../PatientDocumentationSections/NextDocumentationSections/PatientDocumentationForm_NEXT"

const AddPatientDocumentation = () => {
    const [formMode,setFormMode] = useState('menu')

    const FormModeChangeHandler = (mode) => { 
        setFormMode(mode)
    }

    return (
        <>
            {formMode === 'menu' && <AddPatientDocumentation_MENU onModeChange={FormModeChangeHandler} />}
            {formMode === 'FirstDocumentation' && <PatientDocumentationForm_FIRST />}
            {formMode === 'NextDocumentation' && <PatientDocumentationForm_NEXT />}
        </>
    )
}

export default AddPatientDocumentation