import style from './css/Schedule.module.css'
import NoticeList from "./NoticeList";
import CustomDayPicker from "./CustomDayPicker";
import { useMutation } from "@tanstack/react-query";
import { getVisitsByDate } from "../../../api/https";
import { useState } from "react";
import PatientVisitsWrapper from "../../utility/PatientVisitManager/PatientVisitsWrapper"

const Schedule = () => {
  const [selectedDay,setSelectedDay] = useState(new Date());

  const {mutate,data,isPending} = useMutation({
    mutationFn: getVisitsByDate,
    onError: (error) => console.log(error)
  })

  const OnDayClickDisplayVisits = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const fullDate = `${year}-${month}-${day}`
    mutate({date:fullDate});
    setSelectedDay(date)
  }

    return (
      <PatientVisitsWrapper isSchedulePage={true} selectedDay={selectedDay} visits={data ? data : []} isPending={isPending}>
          <div className={style.LeftContainer}>
              <CustomDayPicker showVisits={OnDayClickDisplayVisits} />
              <NoticeList />
          </div>
      </PatientVisitsWrapper>
    )
}

export default Schedule;