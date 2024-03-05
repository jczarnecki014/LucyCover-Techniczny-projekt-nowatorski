import PatientMenu from "../../components/dashboard/patients/PatientMenu/PatientMenu";

import { DUMMY_PATIENTS } from "../../assets/DUMMY_DATA/DUMMY_PATIENTS";
import { redirect } from "react-router-dom";

const PatientMenuPage = () => {
    return  (
        <PatientMenu />
    )
}

export const loader = async ({params}) => {
    const patient = DUMMY_PATIENTS.find((patient) => patient.id === params.patientId)

    try{
        if(!patient){
            throw new Error("User not exist")
        }
    }
    catch(error){
        return redirect("/404")
    }

    return patient
}

export default PatientMenuPage;