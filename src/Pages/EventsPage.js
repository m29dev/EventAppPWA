// src/pages/EventsPage.js
import React, { useState, useEffect } from 'react'
import { db, auth } from '../firebase-config'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const EventsPage = () => {
    const [events, setEvents] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchEvents = async () => {
            const querySnapshot = await getDocs(collection(db, 'events'))
            const eventsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setEvents(eventsData)
        }
        fetchEvents()
    }, [])

    const handleCreateEvent = async (e) => {
        e.preventDefault()

        if (!title || !description) return

        try {
            await addDoc(collection(db, 'events'), {
                title,
                description,
                createdAt: new Date(),
                userId: auth.currentUser?.uid,
            })
            setTitle('')
            setDescription('')
            navigate('/events')
        } catch (error) {
            alert('Error creating event: ' + error.message)
        }
    }

    return (
        <div>
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
                <div key={event.id}>
                    <h4>{event.title}</h4>
                    <p>{event.description}</p>
                </div>
            ))}
        </div>
    )
}

export default EventsPage
