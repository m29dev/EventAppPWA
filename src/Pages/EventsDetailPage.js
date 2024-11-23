import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { db, auth, doc, getDoc, deleteDoc } from '../firebaseConfig'

const EventDetailPage = () => {
    const { id } = useParams() // Get event ID from URL
    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    // Fetch event data from Firebase Firestore
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventDoc = doc(db, 'events', id)
                const docSnap = await getDoc(eventDoc)

                if (docSnap.exists()) {
                    setEvent(docSnap.data())
                } else {
                    setError('Event not found.')
                }
            } catch (error) {
                setError('Error fetching event data.')
            } finally {
                setLoading(false)
            }
        }

        fetchEvent()
    }, [id])

    // Delete event function
    const handleDeleteEvent = async () => {
        try {
            if (event.user_uid !== auth.currentUser.uid) {
                alert("You don't have permission to delete this event.")
                return
            }

            await deleteDoc(doc(db, 'events', id))
            alert('Event deleted successfully!')
            navigate('/events')
        } catch (error) {
            alert('Error deleting event.')
        }
    }

    if (loading) {
        return <div>Loading event...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{event.title}</h1>
            <p style={styles.description}>{event.description}</p>

            {/* Show delete button only if the user is the owner of the event */}
            {event.user_uid === auth.currentUser?.uid && (
                <button style={styles.deleteButton} onClick={handleDeleteEvent}>
                    Delete Event
                </button>
            )}
        </div>
    )
}

// Styles for the Event Details Page
const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        marginTop: '50px',
    },
    title: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
    },
    description: {
        fontSize: '18px',
        color: '#555',
        marginBottom: '30px',
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
    },
}

export default EventDetailPage
