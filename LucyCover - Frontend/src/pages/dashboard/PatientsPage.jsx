import Patients from "../../components/dashboard/patients/PatientsList/Patients";

import { DUMMY_PATIENTS } from "../../assets/DUMMY_DATA/DUMMY_PATIENTS";

const PatientsPage = () => {
    return <Patients />
}

export const loader = async () => {
    
    //Fetch patients List from API
    
    return DUMMY_PATIENTS
}

export default PatientsPage;