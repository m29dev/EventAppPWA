import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateEventDateInfo, updateEventTimeInfo } from '../redux/userSlice'

const DatePickerComponent = () => {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    const dispatch = useDispatch()

    // Handle the change of the date
    const handleDateChange = (e) => {
        setDate(e.target.value)

        console.log(e.target.value)
        dispatch(updateEventDateInfo({ date: e.target.value }))
    }

    // Handle the change of the time
    const handleTimeChange = (e) => {
        setTime(e.target.value)

        console.log(e.target.value)
        dispatch(updateEventTimeInfo({ time: e.target.value }))
    }

    return (
        <div style={styles.container}>
            <input
                type="date"
                value={date}
                onChange={handleDateChange}
                style={styles.input}
            />

            <input
                type="time"
                value={time}
                onChange={handleTimeChange}
                style={styles.input}
            />
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        padding: '10px',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '5px',
        margin: '0px 0px 20px 0px',
        width: '200px',
    },
    label: {
        fontSize: '1rem',
        marginBottom: '5px',
    },
    result: {
        marginTop: '20px',
        fontSize: '1rem',
        color: '#333',
    },
}

export default DatePickerComponent
