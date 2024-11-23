// src/pages/UserPage.js
import React from 'react'
import { auth } from '../firebaseConfig'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const UserPage = () => {
    const navigate = useNavigate()

    const handleSignOut = async () => {
        await signOut(auth)
        navigate('/auth')
    }

    return (
        <div>
            <Navbar />
            <h2>User Profile</h2>
            <p>Email: {auth.currentUser?.email}</p>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}

export default UserPage
