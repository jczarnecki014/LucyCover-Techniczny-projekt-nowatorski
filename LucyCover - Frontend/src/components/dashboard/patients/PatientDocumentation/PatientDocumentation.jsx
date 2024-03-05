import PatientTable from "../PatientTable/PatientTable"
import TableButtons from "../PatientTable/TableButtons"

import style from './css/PatientDocumentation.module.css'

import { useLoaderData } from "react-router-dom"

const PatientDocumentation = () => {
    const patientData = useLoaderData()
    return (
        <PatientTable columns={['ID','Data wizyty','Dziecko']} data={patientData.documentation} patientName={patientData.patientName}>
            {(documentation) => documentation.map(document => {
                return (
                    <tr id={document.first && style.First}>
                    <td>{document.id}</td>
                    <td>{document.date}</td>
                    <td>{document.baby}</td>
                    <TableButtons />
                    </tr>
                )
            })}
        </PatientTable>
    )
}

export default PatientDocumentation

