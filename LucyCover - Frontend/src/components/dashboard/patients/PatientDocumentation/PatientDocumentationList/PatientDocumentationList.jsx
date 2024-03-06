import { AnimatePresence } from "framer-motion"
import PatientTable from "../../PatientTable/PatientTable"
import TableButtons from "../../PatientTable/TableButtons"
import AddPatientDocumentation from "../AddPatientDocumentation/AddPatientDocumentation"

import style from './css/PatientDocumentation.module.css'

import { useSelector} from "react-redux"
import { useLoaderData } from "react-router-dom"

const PatientDocumentationList = () => {
    const patientData = useLoaderData()
    const documentationAddingMode = useSelector((state) => state.overlayModel.isVisible)

    return (
        <>
            <AnimatePresence>
                {documentationAddingMode && <AddPatientDocumentation />}
            </AnimatePresence>
            
            <PatientTable columns={['ID','Data wizyty','Dziecko']} data={patientData.documentation} patientName={patientData.patientName}>
                {(documentation) => documentation.map(document => {
                    return (
                        <tr id={document.first ? style.First : ''} key={document.id}>
                            <td>{document.id}</td>
                            <td>{document.date}</td>
                            <td>{document.baby}</td>
                            <TableButtons />
                        </tr>
                    )
                })}
            </PatientTable>
        </>
    )
}

export default PatientDocumentationList

