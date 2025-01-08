// src/pages/EventsPage.js
import React, { useState, useEffect } from 'react'
import { db } from '../firebaseConfig'
import { collection, getDocs, orderBy } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'

const EventsPage = () => {
    const { user } = useSelector((state) => state.user)
    const [events, setEvents] = useState([])
    const navigate = useNavigate()

    const fetchEvents = async () => {
        const querySnapshot = await getDocs(
            collection(db, 'events'),
            orderBy('created_at')
        )
        const eventsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        console.log(eventsData)
        setEvents(eventsData)
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    return (
        <div>
            <Navbar />

            <div style={styles.navBox}>
                <h3 style={styles.text}>Upcoming Events</h3>
                <button
                    style={styles.button}
                    onClick={() =>
                        user
                            ? navigate('/create')
                            : alert('Sign In to create an event.')
                    }
                >
                    Create
                </button>
            </div>

            <div style={styles.containerBox}>
                {events.map((event) => (
                    <div
                        style={styles.container}
                        key={event.id}
                        onClick={() => navigate(`/events/${event.id}`)}
                    >
                        <div style={styles.boxTop}>
                            <h1 style={styles.title}>{event.title}</h1>
                        </div>
                        <div style={styles.boxBot}>
                            <div style={styles.boxLeft}>
                                <img
                                    src={`
                                    https://xegmsphprxsopaotcvpj.supabase.co/storage/v1/object/public/events/${event?.image}
                                    `}
                                    alt="Account Icon"
                                    style={styles.icon}
                                />
                            </div>
                            <div style={styles.boxRight}>
                                <p style={styles.description}>
                                    {event.address}
                                </p>

                                <p style={styles.description}>
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

// Styles for the Event Details Page
const styles = {
    navBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
    },

    button: {
        // padding: '3px 24px', // Space around the text
        fontSize: '16px', // Text size
        height: '40px',
        width: '80px',
        fontWeight: '500', // Medium weight for clean look
        borderRadius: '30px', // Fully rounded corners
        border: '2px solid transparent', // Transparent border for subtle hover effect
        backgroundColor: '#333330', // Green color (feel free to change)
        color: 'white', // Text color
        cursor: 'pointer', // Pointer cursor on hover
        outline: 'none', // Remove the default focus outline
        transition: 'all 0.3s ease', // Smooth transition for hover effects
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for 3D effect
    },

    containerBox: {
        marginBottom: '60px',
    },

    container: {
        padding: '20px',
        maxWidth: '1000px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        margin: '20px 20px 0px 20px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },

    boxTop: {
        overflow: 'hidden',
    },
    boxBot: {
        display: 'flex',
        flexDirection: 'row',
    },

    title: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#333',
        margin: '0px',
        marginBottom: '20px',
        overflow: 'hidden',
    },
    description: {
        fontSize: '18px',
        color: '#555',
        margin: '0px',
        overflow: 'hidden',
    },

    boxLeft: {
        height: '100px',
        width: '100px',
        minHeight: '100px',
        minWidth: '100px',
        overflow: 'hidden',
        borderRadius: '11px',
        border: '1px solid #ccc',
    },

    icon: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },

    boxRight: {
        marginLeft: '21px',
    },
    //
}

export default EventsPage
