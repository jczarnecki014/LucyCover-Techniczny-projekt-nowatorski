import PatientTable from "../PatientTable/PatientTable"
import { useLoaderData } from "react-router-dom"
import TableButtons from "../PatientTable/TableButtons"

const PatientRecommendation = () => {

    const patientData = useLoaderData()

    return (
        <PatientTable columns={['ID',"Data wystawienia zalecenia"]} data={patientData.recommendation} patientName={patientData.patientName}>
             {(recommendation) => recommendation.map(element => {
                return (
                    <tr >
                        <td>{element.id}</td>
                        <td>{element.date}</td>
                        <TableButtons />
                    </tr>
                )
            })}
        </PatientTable>
    )
}

export default PatientRecommendation

