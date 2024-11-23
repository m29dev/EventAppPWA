// src/pages/EventsPage.js
import React, { useState, useEffect } from 'react'
import { db, auth } from '../firebaseConfig'
import { collection, addDoc, getDocs, orderBy } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const EventsPage = () => {
    const [events, setEvents] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
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

    const handleCreateEvent = async (e) => {
        e.preventDefault()

        if (!title || !description) return

        try {
            const event = await addDoc(collection(db, 'events'), {
                title,
                description,
                createdAt: new Date(),
                userId: auth.currentUser?.uid,
            })
            setTitle('')
            setDescription('')
            navigate('/events')

            fetchEvents()
        } catch (error) {
            alert('Error creating event: ' + error.message)
        }
    }

    return (
        <div>
            <Navbar />

            <h2>Events</h2>
            {auth.currentUser ? (
                <div>
                    <h3>Create New Event</h3>
                    <form onSubmit={handleCreateEvent}>
                        <input
                            type="text"
                            placeholder="Event Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            placeholder="Event Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button type="submit">Create Event</button>
                    </form>
                </div>
            ) : (
                <p>Please sign in to create events.</p>
            )}

            <h3>Upcoming Events</h3>
            {events.map((event) => (
                // <div
                //     key={event.id}
                //     onClick={() => navigate(`/events/${event.id}`)}
                // >
                //     <h4>{event.title}</h4>
                //     <p>{event.description}</p>
                // </div>

                <div
                    style={styles.container}
                    key={event.id}
                    onClick={() => navigate(`/events/${event.id}`)}
                >
                    <h1 style={styles.title}>{event.title}</h1>
                    <p style={styles.description}>{event.description}</p>
                </div>
            ))}
        </div>
    )
}

// Styles for the Event Details Page
const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        margin: '30px 30px 0px 30px',
    },

    title: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#333',
        margin: '0px',
        marginBottom: '20px',
    },
    description: {
        fontSize: '18px',
        color: '#555',
        margin: '0px',
    },
}

export default EventsPage
