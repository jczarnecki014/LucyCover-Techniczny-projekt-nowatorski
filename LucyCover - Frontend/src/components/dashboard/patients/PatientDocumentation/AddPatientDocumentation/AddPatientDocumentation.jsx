import { useState } from "react"
import useFetchDocumentation from "../../../../../hooks/useFetchDocumentation"
import PopupMenu from "../../../../utility/PatientsPopups/PatientPopupMenu"
import PatientDocumentationForm_FIRST from "../PatientDocumentationSections/FirstDocumentationSections/PatientDocumentationForm_FIRST"
import PatientDocumentationForm_NEXT from "../PatientDocumentationSections/NextDocumentationSections/PatientDocumentationForm_NEXT"

const AddPatientDocumentation = ({patientId,patientData}) => {
    const [formMode,setFormMode] = useState('menu')
    const {fetchDocumentation,isSuccess,isError} = useFetchDocumentation(patientId);

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
            {formMode === 'FirstDocumentation' && <PatientDocumentationForm_FIRST onFormSubmit={fetchDocumentation} childrenList={patientData.children} isSuccess={isSuccess} />}
            {formMode === 'NextDocumentation' && <PatientDocumentationForm_NEXT onFormSubmit={fetchDocumentation} childrenList={patientData.children} isSuccess={isSuccess} />}
        </>
    )
}

export default AddPatientDocumentation