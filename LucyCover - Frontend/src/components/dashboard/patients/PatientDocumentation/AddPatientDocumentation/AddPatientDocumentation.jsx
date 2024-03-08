import { useState } from "react"

import AddPatientDocumentation_MENU from "./AddPatientDocumentation_MENU"
import AddPatientDocumentation_FIRST from "./AddPatientDocumentation_FIRST"
import AddPatientDocumentation_NEXT from "./AddPatientDocumentation_NEXT"

const AddPatientDocumentation = () => {
    const [formMode,setFormMode] = useState('menu')

    const FormModeChangeHandler = (mode) => { 
        setFormMode(mode)
    }

    return (
        <>
            {formMode === 'menu' && <AddPatientDocumentation_MENU onModeChange={FormModeChangeHandler} />}
            {formMode === 'FirstDocumentation' && <AddPatientDocumentation_FIRST />}
            {formMode === 'NextDocumentation' && <AddPatientDocumentation_NEXT />}
        </>
    )
}

export default AddPatientDocumentation