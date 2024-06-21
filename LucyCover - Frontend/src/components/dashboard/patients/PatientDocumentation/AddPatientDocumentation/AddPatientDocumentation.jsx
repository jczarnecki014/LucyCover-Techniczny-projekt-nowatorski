import { useState } from "react"

import PopupMenu from "../../../../utility/PatientsPopups/PatientPopupMenu"
import PatientDocumentationForm_FIRST from "../PatientDocumentationSections/FirstDocumentationSections/PatientDocumentationForm_FIRST"
import PatientDocumentationForm_NEXT from "../PatientDocumentationSections/NextDocumentationSections/PatientDocumentationForm_NEXT"

const AddPatientDocumentation = () => {
    const [formMode,setFormMode] = useState('menu')

    const FormModeChangeHandler = (mode) => { 
        setFormMode(mode)
    }

    const FetchDataHandler = (documentationType,formInputs) => {
        console.log(formInputs)
    }

    return (
        <>
            {formMode === 'menu' && <PopupMenu 
                                        title="Dodaj nową dokumentację" 
                                        header="Wybierz rodzaj wprowadzanej dokumentacji" 
                                        leftBtn={{desc:'Pierwszorazowa wizyta',func:FormModeChangeHandler}}
                                        rightBtn={{desc:'Kolejna wizyta (domowa)',func:FormModeChangeHandler}} 
                                        />}
            {formMode === 'FirstDocumentation' && <PatientDocumentationForm_FIRST onFormSubmit={FetchDataHandler} />}
            {formMode === 'NextDocumentation' && <PatientDocumentationForm_NEXT onFormSubmit={FetchDataHandler} />}
        </>
    )
}

export default AddPatientDocumentation