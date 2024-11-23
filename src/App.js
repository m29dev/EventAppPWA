import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import UserPage from './pages/UserPage'
import EventsPage from './pages/EventsPage'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/events" element={<EventsPage />} />
            </Routes>
        </Router>
    )
}

export default App
