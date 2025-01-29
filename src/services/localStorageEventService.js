export const setEventInfo = (userObject) => {
    localStorage.setItem('eventInfo', JSON.stringify(userObject))
}

export const clearEventInfo = () => {
    localStorage.removeItem('eventInfo')
}

export const getEventInfo = () => {
    const event = localStorage.getItem('eventInfo')
    if (!event) return null
    return JSON.parse(localStorage.getItem('eventInfo'))
}
