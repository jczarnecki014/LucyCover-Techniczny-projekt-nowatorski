import Patients from "../../components/dashboard/patients/PatientsList/Patients";
import { queryClient } from "../../api/https";
import { fetchPatientsForSearchList } from "../../api/https";
import { useDispatch } from "react-redux";
import { SetActivePage } from "../../context/slices/MainMenuSlice";
import { useEffect } from "react";

/**
 * PatientsPage - Page to display available patient list and basic info about them
 * 
 *
 * @component
 */

const PatientsPage = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(SetActivePage("patients"))
    },[])

    return <Patients />
}


/**
 * loader - function using to pre-loaded available patients list before display page
 *
 * @function
 */
export const loader = async () => {
    return queryClient.fetchQuery({
        queryKey: ['patients'],
        queryFn: ({signal}) => fetchPatientsForSearchList(signal)
    })
}


export default PatientsPage;