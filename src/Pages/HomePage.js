// src/pages/HomePage.js
import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to Event App</h1>
            <Link to="/auth">Login</Link> | <Link to="/events">Events</Link>
        </div>
    )
}

export default HomePage
