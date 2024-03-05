import { useState } from "react"

import AddPatientDocumentation_MENU from "./AddPatientDocumentation_MENU"

const AddPatientDocumentation = () => {
    const [formMode,setFormMode] = useState('menu')

    const FormModeChangeHandler = (mode) => { 
        setFormMode(mode)
    }

    return (
        <>
            {formMode === 'menu' && <AddPatientDocumentation_MENU onModeChange={FormModeChangeHandler} />}
            {formMode === 'FirstDocumentation' && <AddPatientDocumentation_MENU onModeChange={FormModeChangeHandler} />}
            {formMode === 'NextDocumentation' && <AddPatientDocumentation_MENU onModeChange={FormModeChangeHandler} />}
        </>
    )
}

export default AddPatientDocumentation