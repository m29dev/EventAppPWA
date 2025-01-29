import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { updateEventDateInfo, updateEventTimeInfo } from '../redux/eventSlice'

import './styles/datePickerStyles.css'

const DatePickerComponent = () => {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    const dispatch = useDispatch()

    // Handle the change of the date
    const handleDateChange = (e) => {
        setDate(e.target.value)
        dispatch(updateEventDateInfo({ date: e.target.value }))
    }

    // Handle the change of the time
    const handleTimeChange = (e) => {
        setTime(e.target.value)
        dispatch(updateEventTimeInfo({ time: e.target.value }))
    }

    return (
        <div className="dp_container">
            <input
                type="date"
                value={date}
                onChange={handleDateChange}
                className="dp_input"
            />

            <input
                type="time"
                value={time}
                onChange={handleTimeChange}
                className="dp_input"
            />
        </div>
    )
}

export default DatePickerComponent
