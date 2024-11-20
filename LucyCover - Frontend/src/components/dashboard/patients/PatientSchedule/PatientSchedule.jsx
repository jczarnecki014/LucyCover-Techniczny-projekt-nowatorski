//Components
import PatientDetails from "../PatientDetails/PatientDetails"
import PatientVisitsWrapper from "../../../utility/PatientVisitManager/PatientVisitsWrapper"
//Hooks
import { useQuery } from "@tanstack/react-query"
//Api
import { fetchAllPatientVisits } from "../../../../api/https"


/**
 * PatientSchedule - component to display specific patient schedule page
 * 
 * Functionality:
 * 
 *  [1] - Displaing schedules for only specific patient
 * 
 *  [2] - Creating new visits for patient
 */


const PatientSchedule = () => {
    const {data} = useQuery({
        queryKey: ['schedule'],
        queryFn: ({signal}) => fetchAllPatientVisits({signal,patientId:data.patientDetails.patientId})
    })
    const {firstName,lastName,city,address,zipCode,province,phoneNumber,email,children} = data.patientDetails

    return (
        <PatientVisitsWrapper visits={data.patientVisits}>
            <PatientDetails>
                <PatientDetails.NameSection firstName={firstName} lastName={lastName}/>
                <PatientDetails.ContactSection city={city} street={address} zipCode={zipCode} province={province} phone={phoneNumber} email={email} />
                <PatientDetails.ChildrenSection children={children} />
            </PatientDetails>
        </PatientVisitsWrapper>
    )
}

export default PatientSchedule