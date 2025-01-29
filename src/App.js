import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import AppRoutes from './AppRoutes'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './App.css'

const App = () => {
    const showToast = (value) => {
        toast.success(value, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'light',
        })
    }

    useEffect(() => {
        // Handler for online event
        const handleOnline = () => {
            showToast('You are now back online!')
        }

        // Handler for offline event
        const handleOffline = () => {
            showToast(
                'You are now offline. Please check your internet connection.'
            )
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
        <>
            <Router>
                <AppRoutes />
            </Router>

            <ToastContainer />
        </>
    )
}

export default App
