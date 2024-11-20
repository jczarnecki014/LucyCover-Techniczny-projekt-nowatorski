//Components
import NoticeList from "./NoticeList";
import CustomDayPicker from "./CustomDayPicker";
import PatientVisitsWrapper from "../../utility/PatientVisitManager/PatientVisitsWrapper"
//Style
import style from './css/Schedule.module.css'
//Hooks
import {useQuery } from "@tanstack/react-query";
import { useState,useEffect } from "react";
//Api
import { getVisitsByDate } from "../../../api/https";
import { queryClient } from "../../../api/https";
//Assets
import { ConvertDateToLocalString } from "../../../assets/main/ConvertDateToLocalString";

/** 
* Schedule - Main component to display schedules page.
*
* This component use <PatientVisitWrapper>. PatientVisitWrapper displays fetched visits as a list in separate shared component
* 
* Functionality:
*
* [1] - Keeping state of selected date by user
*
* [2] - Fetching scheduled visit for selected date
*
* [3] - Displaying date picker and user notice list
*
*/
const Schedule = () => {
  const [selectedDay,SetSelectedDay] = useState(new Date());
  const localStringDate = ConvertDateToLocalString(selectedDay)

  const {data,isPending} = useQuery({
    queryFn: ({signal}) => getVisitsByDate({date:localStringDate,signal:signal}),
    queryKey: ["schedule",{localStringDate}]
  })

  useEffect(() => {
    queryClient.invalidateQueries(["schedule",{localStringDate}])
  },[selectedDay])

    return (
      <PatientVisitsWrapper isSchedulePage={true} selectedDay={selectedDay} visits={data ? data : []} isPending={isPending}>
          <div className={style.LeftContainer}>
              <CustomDayPicker onDayChange={SetSelectedDay} />
              <NoticeList />
          </div>
      </PatientVisitsWrapper>
    )
}

export default Schedule;