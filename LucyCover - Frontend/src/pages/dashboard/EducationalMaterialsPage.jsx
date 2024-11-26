import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { SetActivePage } from "../../context/slices/MainMenuSlice";
import Education from "../../components/dashboard/education/Education";
import {queryClient} from '../../api/https'
import { FetchAllEducationMaterial } from "../../api/https";

/**
 * EducationalMaterialsPage - Page to display every educational material / files stored by user on his netwoork disk space.
 * 
 *
 * @component
 */

const EducationalMaterialsPage = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(SetActivePage("education"))
    },[])

    return <Education />
}

/**
 * loader - function to fetch every stored material list to display before page load
 * 
 *
 * @function
 */

export const loader = () => {
    return queryClient.fetchQuery({
        queryKey:['educationMaterials'],
        queryFn: ({signal}) => FetchAllEducationMaterial({signal})                     
    })
}

export default EducationalMaterialsPage