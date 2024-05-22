import Patients from "../../components/dashboard/patients/PatientsList/Patients";

import { DUMMY_PATIENTS } from "../../assets/DUMMY_DATA/DUMMY_PATIENTS";

import { useQuery } from "@tanstack/react-query";
import { fetchPatients } from "../../api/https";

const PatientsPage = () => {
    const {data,status} = useQuery({
        queryKey: ['patients'],
        queryFn: ({signal}) => fetchPatients(signal),
        staleTime: 5000,
    })

    console.log(data)

    return <Patients />
}

export const loader = async () => {
    
    //Fetch patients List from API
    
    return DUMMY_PATIENTS
}

export default PatientsPage;