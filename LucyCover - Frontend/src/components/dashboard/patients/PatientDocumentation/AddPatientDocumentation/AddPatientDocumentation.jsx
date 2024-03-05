import { useState } from "react"

import AddPatientDocumentation_MENU from "./AddPatientDocumentation_MENU"

const AddPatientDocumentation = () => {
    const [formMode,setFormMode] = useState('menu')
    return (
        <>
            {formMode === 'menu' && <AddPatientDocumentation_MENU />}
        </>
    )
}

export default AddPatientDocumentation