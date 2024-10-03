import style from './css/Schedule.module.css'
import { DayPicker } from "react-day-picker";
import './css/DatePickerCustom.css'
import { pl } from "react-day-picker/locale";
import { useMutation } from '@tanstack/react-query';
import { getVisitsByMonth } from '../../../api/https';
import { useEffect, useState } from 'react';

const CustomDayPicker = ({showVisits}) => {
    const [arrangeDaysInMonth,setArrangeDaysInMonth] = useState();

    const ConvertAndSetArrangeDays = (stringFormatDateList) => {
        const dateFormatList = stringFormatDateList.map( date => {
            let timestamp = Date.parse(date)
            return new Date(timestamp)
        })
        setArrangeDaysInMonth(dateFormatList)
    }

    const {mutate} = useMutation({
        mutationFn: getVisitsByMonth,
        onSuccess: (date) => ConvertAndSetArrangeDays(date),
        onError: (error) => console.log(error)
    })

    const MonthChangeHandler = (date) => {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        mutate({month})
    }

    useEffect(()=>{
        const today = new Date();
        MonthChangeHandler(today)
        showVisits(today)
    },[])

    return (
        <DayPicker
            mode="single"
            locale={pl}
            className={style.DatePicker}
            showOutsideDays
            modifiers={{
                arrangeDays: arrangeDaysInMonth
                }}
                modifiersClassNames={{
                    arrangeDays: 'arrangeDays'
                }}
                onDayClick={(date, modifiers) => {
                    showVisits(date)
                }}
                onMonthChange={MonthChangeHandler}
                 
        />
    )
}

export default CustomDayPicker;