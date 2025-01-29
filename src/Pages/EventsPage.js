import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Navbar from '../components/Navbar'

import { db } from '../firebaseConfig'
import { collection, getDocs, orderBy } from 'firebase/firestore'

import './styles/eventsPageStyles.css'

const EventsPage = () => {
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [events, setEvents] = useState([])
    const [error, setError] = useState(null)

    const fetchEvents = async () => {
        try {
            const querySnapshot = await getDocs(
                collection(db, 'events'),
                orderBy('created_at')
            )
            const eventsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setEvents(eventsData)
        } catch (err) {
            setError('error while fetching events')
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    return (
        <div>
            <Navbar />

            <div className="e_navBox">
                <h3 className="e_text">Upcoming Events</h3>

                <button
                    className="e_button"
                    onClick={() =>
                        user
                            ? navigate('/create')
                            : alert('Sign In to create an event.')
                    }
                >
                    Create
                </button>
            </div>

            <div className="e_containerBox">
                {error && <p className="e_textError">{error}</p>}

                {events.map((event) => (
                    <div
                        className="e_container"
                        key={event.id}
                        onClick={() => navigate(`/events/${event.id}`)}
                    >
                        <div className="e_boxTop">
                            <h1 className="e_title">{event.title}</h1>
                        </div>
                        <div className="e_boxBot">
                            <div className="e_boxLeft">
                                <img
                                    src={`
                                    https://xegmsphprxsopaotcvpj.supabase.co/storage/v1/object/public/events/${event?.image}
                                    `}
                                    alt="Account Icon"
                                    className="e_icon"
                                />
                            </div>
                            <div className="e_boxRight">
                                <p className="e_description">{event.address}</p>

                                <p className="e_description">
                                    {event.date}, {event.time}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EventsPage
