import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db, doc, getDoc, deleteDoc } from '../firebaseConfig' // Ensure this is your Firebase setup
import { getAuth } from 'firebase/auth'
import MapDisplayDetails from '../components/MapDisplayDetails'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'

const EventsDetailPage = () => {
    const { id } = useParams() // Get the event ID from the URL
    const { user } = useSelector((state) => state.user)
    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    // const history = useHistory()
    const navigate = useNavigate()
    const auth = getAuth() // Firebase Auth to access current user's UID

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventDoc = doc(db, 'events', id)
                const docSnap = await getDoc(eventDoc)

                if (docSnap.exists()) {
                    setEvent(docSnap.data())
                    console.log('EVENT: ', docSnap.data())
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

    const handleDeleteEvent = async () => {
        try {
            if (event.userId !== user?.id) {
                alert('You are not authorized to delete this event')
                return
            }

            await deleteDoc(doc(db, 'events', id))
            console.log('Event deleted successfully!')
            navigate('/events')
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) return <div className="loading">Loading event...</div>
    if (error) return <div>{error}</div>

    return (
        <div>
            <Navbar />

            <div style={styles.container}>
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
                    <h1 style={styles.title}>{event.title}</h1>
                    <p style={styles.description}>
                        Description: {event.description}
                    </p>
                    <p style={styles.description}>Location: {event.address}</p>
                </div>
            </div>

            <MapDisplayDetails data={event.location} />

            {event.userId === user?.id && (
                <div style={styles.controlPanel}>
                    <button
                        style={styles.button}
                        onClick={() => navigate(`/events/${id}/edit`)}
                    >
                        Edit
                    </button>
                    <button style={styles.button} onClick={handleDeleteEvent}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}

// Styling for the Event Details Page
const styles = {
    button: {
        // padding: '3px 24px', // Space around the text
        fontSize: '16px', // Text size
        height: '40px',
        // width: '80px',
        padding: '0px 10px 0px 10px',
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
    controlPanel: {
        flex: 1,
        height: '50px',
        borderRadius: '50px',
        backgroundColor: '#333330',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: '20px 20px 50px 20px',
    },

    icon: {
        height: '200px',
        width: '200px',
        borderRadius: '24px',
        overflow: 'hidden',
    },
    container: {
        padding: '20px',
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        flex: 1,
    },
    hero: {
        position: 'relative',
        height: '400px',
        overflow: 'hidden',
        borderRadius: '8px',
        marginBottom: '30px',
    },
    heroImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        filter: 'brightness(50%)',
    },
    heroText: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        textAlign: 'center',
    },
    title: {
        fontSize: '42px',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        margin: '0',
        overflowWrap: 'break-word',
    },
    subtitle: {
        fontSize: '16px',
        marginTop: '10px',
        fontWeight: '300',
    },
    details: {
        padding: '20px',
    },
    description: {
        fontSize: '18px',
        color: '#333',
        marginBottom: '20px',
    },
}

export default EventsDetailPage
