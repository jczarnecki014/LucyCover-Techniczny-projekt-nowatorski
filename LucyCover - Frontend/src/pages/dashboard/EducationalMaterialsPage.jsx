import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { SetActivePage } from "../../context/slices/MainMenuSlice";
import Education from "../../components/dashboard/education/Education";
import {queryClient} from '../../api/https'
import { fetchAllEducationMaterial } from "../../api/https";

const EducationalMaterialsPage = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(SetActivePage("education"))
    },[])

    return <Education />
}

export const loader = () => {
    return queryClient.fetchQuery({
        queryKey:['educationMaterials'],
        queryFn: ({signal}) => fetchAllEducationMaterial({signal})                     
    })
}

export default EducationalMaterialsPage