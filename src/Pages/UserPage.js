import React from 'react'
import { useNavigate } from 'react-router-dom'

import Navbar from '../components/Navbar'

import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../redux/userSlice'

import './styles/userPageStyles.css'

const UserPage = () => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleSignOut = () => {
        navigate('/auth')

        // clear state
        dispatch(clearUser())
    }

    return (
        <>
            <Navbar></Navbar>

            <div className="u_container">
                <h1>user: {user?.email}</h1>
            </div>

            <div className="u_controlPanel">
                <button className="u_button" onClick={() => navigate('/')}>
                    Home
                </button>
                <button className="u_button" onClick={handleSignOut}>
                    Sign Out
                </button>
            </div>
        </>
    )
}

export default UserPage
