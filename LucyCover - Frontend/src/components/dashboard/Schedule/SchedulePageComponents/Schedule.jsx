import PageBreakLayout from "../../../utility/PageBreakLayout/PageBreakLayout";
import style from './css/Schedule.module.css'
import NoticeList from "./NoticeList";
import CustomDayPicker from "./CustomDayPicker";
import PatientVisitsTable from "../../patients/PatientSchedule/PatientVisitsTable";

const Schedule = () => {
    const patientVisits = [
      {
        id: 1,
        date: "2024-08-07",
        clock: "09:51",
        status: "Zaplanowana"
      },
      {
        id: 1,
        date: "2024-08-07",
        clock: "09:51",
        status: "Zaplanowana"
      },
      {
        id: 1,
        date: "2024-08-07",
        clock: "09:51",
        status: "Zaplanowana"
      },
      {
        id: 1,
        date: "2024-08-07",
        clock: "09:51",
        status: "Zaplanowana"
      },
      {
        id: 1,
        date: "2024-08-07",
        clock: "09:51",
        status: "Zaplanowana"
      },
      {
        id: 1,
        date: "2024-08-07",
        clock: "09:51",
        status: "Zaplanowana"
      },
      {
        id: 1,
        date: "2024-08-07",
        clock: "09:51",
        status: "Zaplanowana"
      },
      {
        id: 1,
        date: "2024-08-07",
        clock: "09:51",
        status: "Zaplanowana"
      },
      {
        id: 1,
        date: "2024-08-07",
        clock: "09:51",
        status: "Zaplanowana"
      },
      {
        id: 1,
        date: "2024-08-07",
        clock: "09:51",
        status: "Zaplanowana"
      },

      
    ]
    return (
        <PageBreakLayout>
            <PageBreakLayout.LeftSide>
                <div className={style.LeftContainer}>
                    <CustomDayPicker />
                    <NoticeList />
                </div>
            </PageBreakLayout.LeftSide>
            <PageBreakLayout.RightSide>
                <div className={style.RightContainer}>
                  <div className={style.DateInfo}>
                    <h4>11 czerwiec</h4>
                  </div>
                  <PatientVisitsTable visits={patientVisits} />
                </div>
            </PageBreakLayout.RightSide>
        </PageBreakLayout>
    )
}

export default Schedule;