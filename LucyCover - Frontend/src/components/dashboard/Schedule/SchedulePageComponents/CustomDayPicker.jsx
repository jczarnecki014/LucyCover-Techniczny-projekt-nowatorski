import style from './css/Schedule.module.css'
import { DayPicker } from "react-day-picker";
import './css/DatePickerCustom.css'
import { pl } from "react-day-picker/locale";

const CustomDayPicker = () => {
    return (
        <DayPicker
            mode="single"
            locale={pl}
            className={style.DatePicker}
            modifiers={{
                booked: [
                    new Date(2024, 8, 8),
                    new Date(2024, 8, 9),
                    new Date(2024, 8, 10),
                    { from: new Date(2022, 5, 15), to: new Date(2022, 5, 20) }
                ]
                }}
                modifiersClassNames={{
                booked: 'booked'
                }}
                onDayClick={(date, modifiers) => {
                if (modifiers.booked) {
                    alert("This day is already booked.");
                }
                }} 
        />
    )
}

export default CustomDayPicker;