import { useDispatch } from "react-redux";
import { SetActivePage } from "@context/slices/MainMenuSlice";
import { useEffect } from "react";
import Schedule from "@components/dashboard/Schedule/Schedule";

/**
 * SchedulePage - Page to display list of scheduled visit for specific user
 * 
 *
 * @component
 */

const SchedulePage = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(SetActivePage("schedule"))
    },[])

    return <Schedule />
}



export default SchedulePage