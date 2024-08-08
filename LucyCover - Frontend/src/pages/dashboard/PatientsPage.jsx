import Patients from "../../components/dashboard/patients/PatientsList/Patients";
import { queryClient } from "../../api/https";
import { fetchPatientsForSearchList } from "../../api/https";
import { useDispatch } from "react-redux";
import { SetActivePage } from "../../context/slices/MainMenuSlice";
import { useEffect } from "react";

const PatientsPage = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(SetActivePage("patients"))
    },[])

    return <Patients />
}

export const loader = async () => {
    return queryClient.fetchQuery({
        queryKey: ['patients'],
        queryFn: ({signal}) => fetchPatientsForSearchList(signal)
    })
}


export default PatientsPage;