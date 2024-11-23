// src/pages/HomePage.js
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const HomePage = () => {
    const dispatch = useDispatch()
    const [user] = useSelector((state) => state.user) // Pobieramy stan z Redux

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <div>
            <Navbar />
            <h1>Welcome to Event App</h1>
            <Link to="/auth">Login</Link> | <Link to="/events">Events</Link>
        </div>
    )
}

export default HomePage
