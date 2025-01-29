import React from 'react'
import { useNavigate } from 'react-router-dom'

import Navbar from '../components/Navbar'

import './styles/homePageStyles.css'

const HomePage = () => {
    const navigate = useNavigate()

    return (
        <div>
            <Navbar />

            <div className="h_container">
                <h1 className="h_title">evento</h1>
                <h3 className="h_header">Ultimate Event Companion</h3>
                <p className="h_description">
                    Welcome to evento, the ultimate platform for discovering,
                    managing, and attending events that matter to you! Whether
                    you're looking to organize your own events, attend exciting
                    local happenings, or stay on top of your community’s social
                    calendar, evento has got you covered.
                </p>
            </div>

            <div className="h_controlPanel">
                <button
                    className="h_buttonPanel"
                    onClick={() => navigate(`/events`)}
                >
                    let's start
                    <img className="h_logo" src="./logo.png" alt="logo"></img>
                </button>
            </div>
        </div>
    )
}

export default HomePage
