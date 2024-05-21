import PatientSchedule from "../../components/dashboard/patients/PatientSchedule/PatientSchedule";

import { DUMMY_PATIENTS } from "../../assets/DUMMY_DATA/DUMMY_PATIENTS";
import { DUMMY_PATIENTS_VISITS } from "../../assets/DUMMY_DATA/DUMMY_PATIENTS_VISITS";
import { redirect } from "react-router-dom";

const PatientSchedulePage = () => {
    return  (
        <PatientSchedule />
    )
}

export const loader = async ({params}) => {
    const patientDetails = DUMMY_PATIENTS.find((patient) => patient.id === params.patientId)
    const patientVisits = DUMMY_PATIENTS_VISITS.filter((visit) => visit.patientId === patientDetails.id)

    try{
        if(!patientDetails){
            throw new Error("User not exist")
        }
    }
    catch(error){
        return redirect("/404")
    }

    return {
        patientDetails,
        patientVisits
    }
}

export default PatientSchedulePage;