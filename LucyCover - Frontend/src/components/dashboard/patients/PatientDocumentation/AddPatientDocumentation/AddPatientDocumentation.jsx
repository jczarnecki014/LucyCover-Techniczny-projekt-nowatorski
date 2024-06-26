import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import PopupMenu from "../../../../utility/PatientsPopups/PatientPopupMenu"
import PatientDocumentationForm_FIRST from "../PatientDocumentationSections/FirstDocumentationSections/PatientDocumentationForm_FIRST"
import PatientDocumentationForm_NEXT from "../PatientDocumentationSections/NextDocumentationSections/PatientDocumentationForm_NEXT"
import { createNewDocumentation } from "../../../../../api/https"

const AddPatientDocumentation = ({patientId,patientData}) => {
    const [formMode,setFormMode] = useState('menu')
    const {mutate,isPending} = useMutation({
        mutationFn: createNewDocumentation,
        onError: (error) => {
            console.log(error)
        }
    })

    const FormModeChangeHandler = (mode) => { 
        setFormMode(mode)
    }

    const FetchDataHandler = (firstVisitDocumentation,formInputs) => {
        formInputs.motherAge = null;
        const dataToFetch = {
            First: firstVisitDocumentation,
            ChildrenName: formInputs.patientChildrenName,
            Date: formInputs.visitDate,
            DocumentationFirstVisit: formInputs
        }
        console.log(dataToFetch)
        mutate({documentationDetails:dataToFetch,patientId:patientId})
    }

    return (
        <>
            {formMode === 'menu' && <PopupMenu 
                                        title="Dodaj nową dokumentację" 
                                        header="Wybierz rodzaj wprowadzanej dokumentacji" 
                                        leftBtn={{desc:'Pierwszorazowa wizyta',func:FormModeChangeHandler}}
                                        rightBtn={{desc:'Kolejna wizyta (domowa)',func:FormModeChangeHandler}} 
                                        />}
            {formMode === 'FirstDocumentation' && <PatientDocumentationForm_FIRST onFormSubmit={FetchDataHandler} patient={patientData} />}
            {formMode === 'NextDocumentation' && <PatientDocumentationForm_NEXT onFormSubmit={FetchDataHandler} />}
        </>
    )
}

export default AddPatientDocumentation