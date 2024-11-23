import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AuthPage from './Pages/AuthPage'
import UserPage from './Pages/UserPage'
import EventsPage from './Pages/EventsPage'
import EventsDetailPage from './Pages/EventsDetailPage'
import EventsCreatePage from './Pages/EventsCreatePage'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:id" element={<EventsDetailPage />} />
                <Route path="/create" element={<EventsCreatePage />} />
            </Routes>
        </Router>
    )
}

export default App
