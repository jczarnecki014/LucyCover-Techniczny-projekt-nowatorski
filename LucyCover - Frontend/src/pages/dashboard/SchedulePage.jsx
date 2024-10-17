import { useDispatch } from "react-redux";
import { SetActivePage } from "../../context/slices/MainMenuSlice";
import { useEffect } from "react";
import Schedule from "../../components/dashboard/Schedule/Schedule";


const SchedulePage = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(SetActivePage("schedule"))
    },[])

    return <Schedule />
}



export default SchedulePage