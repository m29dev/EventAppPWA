import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AuthPage from './Pages/AuthPage'
import UserPage from './Pages/UserPage'
import EventsPage from './Pages/EventsPage'
import EventsDetailPage from './Pages/EventsDetailPage'
import EventsCreatePage from './Pages/EventsCreatePage'
import EventsEditPage from './Pages/EventsEditPage'

const App = () => {
    useEffect(() => {
        // Handler for online event
        const handleOnline = () => {
            alert('You are now back online!')
        }

        // Handler for offline event
        const handleOffline = () => {
            alert('You are now offline. Please check your internet connection.')
        }

        // Add event listeners for online/offline status
        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        // Clean up the event listeners on component unmount
        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [])

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:id" element={<EventsDetailPage />} />
                <Route path="/events/:id/edit" element={<EventsEditPage />} />
                <Route path="/create" element={<EventsCreatePage />} />
            </Routes>
        </Router>
    )
}

export default App
