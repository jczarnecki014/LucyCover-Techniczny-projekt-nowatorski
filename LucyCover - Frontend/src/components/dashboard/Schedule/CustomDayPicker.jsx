//Componets
import { DayPicker } from "react-day-picker";
import { pl } from "react-day-picker/locale";
//Style
import style from './css/Schedule.module.css'
import './css/DatePickerCustom.css'
//Hooks
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
//Api
import { GetVisitsByMonth } from '@api/https';

/** 
* CustomDayPicker - calendar to pick date
*
* Functionality:
*
* [1] - Calendar to pick specific date
*
* [2] - Invoking supllied function when user change a date
*
* [3] - Calendar fetch all visits for selected month and mark every day of the month when some visits are
*
* Params:
* @param
* ShowVisits - function which will be invoke when user pick a date. By default CustomDatePicker invoke this function when
* component first run to set first date as today 
*
*/

const CustomDayPicker = ({onDayChange}) => {
    const [arrangeDaysInMonth,SetArrangeDaysInMonth] = useState();

    const ConvertAndSetArrangeDays = (stringFormatDateList) => {
        const dateFormatList = stringFormatDateList.map( date => {
            let timestamp = Date.parse(date)
            return new Date(timestamp)
        })
        SetArrangeDaysInMonth(dateFormatList)
    }

    const {mutate} = useMutation({
        mutationFn: GetVisitsByMonth,
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
                    onDayChange(date)
                }}
                onMonthChange={MonthChangeHandler}
        />
    )
}

export default CustomDayPicker;