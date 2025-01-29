export const setUserInfo = (userObject) => {
    localStorage.setItem('userInfo', JSON.stringify(userObject))
}

export const clearUserInfo = () => {
    localStorage.removeItem('userInfo')
}

export const getUserInfo = () => {
    const user = localStorage.getItem('userInfo')
    if (!user) return null
    return JSON.parse(localStorage.getItem('userInfo'))
}
