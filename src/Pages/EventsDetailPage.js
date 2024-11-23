// import React, { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { db, auth, doc, getDoc, deleteDoc } from '../firebaseConfig'

// const EventDetailPage = () => {
//     const { id } = useParams() // Get event ID from URL
//     const [event, setEvent] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)
//     const navigate = useNavigate()

//     // Fetch event data from Firebase Firestore
//     useEffect(() => {
//         const fetchEvent = async () => {
//             try {
//                 const eventDoc = doc(db, 'events', id)
//                 const docSnap = await getDoc(eventDoc)

//                 if (docSnap.exists()) {
//                     setEvent(docSnap.data())
//                 } else {
//                     setError('Event not found.')
//                 }
//             } catch (error) {
//                 setError('Error fetching event data.')
//             } finally {
//                 setLoading(false)
//             }
//         }

//         fetchEvent()
//     }, [id])

//     // Delete event function
//     const handleDeleteEvent = async () => {
//         try {
//             if (event.user_uid !== auth.currentUser.uid) {
//                 alert("You don't have permission to delete this event.")
//                 return
//             }

//             await deleteDoc(doc(db, 'events', id))
//             alert('Event deleted successfully!')
//             navigate('/events')
//         } catch (error) {
//             alert('Error deleting event.')
//         }
//     }

//     if (loading) {
//         return <div>Loading event...</div>
//     }

//     if (error) {
//         return <div>{error}</div>
//     }

//     return (
//         <div style={styles.container}>
//             <h1 style={styles.title}>{event.title}</h1>
//             <p style={styles.description}>{event.description}</p>

//             {/* Show delete button only if the user is the owner of the event */}
//             {event.user_uid === auth.currentUser?.uid && (
//                 <button style={styles.deleteButton} onClick={handleDeleteEvent}>
//                     Delete Event
//                 </button>
//             )}
//         </div>
//     )
// }

// // Styles for the Event Details Page
// const styles = {
//     container: {
//         padding: '20px',
//         maxWidth: '600px',
//         margin: '0 auto',
//         backgroundColor: '#fff',
//         borderRadius: '8px',
//         boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//         marginTop: '50px',
//     },
//     title: {
//         fontSize: '32px',
//         fontWeight: 'bold',
//         color: '#333',
//         marginBottom: '20px',
//     },
//     description: {
//         fontSize: '18px',
//         color: '#555',
//         marginBottom: '30px',
//     },
//     deleteButton: {
//         backgroundColor: '#e74c3c',
//         color: 'white',
//         border: 'none',
//         padding: '10px 20px',
//         fontSize: '16px',
//         cursor: 'pointer',
//         borderRadius: '5px',
//         transition: 'background-color 0.3s',
//     },
// }

// export default EventDetailPage

import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db, doc, getDoc, deleteDoc } from '../firebaseConfig' // Ensure this is your Firebase setup
import { getAuth } from 'firebase/auth'
import { Modal } from 'react-bootstrap' // You can use a modal library for confirmation

const EventsDetailPage = () => {
    const { id } = useParams() // Get the event ID from the URL
    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [deleteError, setDeleteError] = useState(false)
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
            if (event.user_uid !== auth.currentUser?.uid) {
                alert('You are not authorized to delete this event')
                return
            }

            await deleteDoc(doc(db, 'events', id))
            alert('Event deleted successfully!')
            navigate.push('/') // Redirect to home after deletion
        } catch (error) {
            setDeleteError(true)
        }
    }

    if (loading) return <div className="loading">Loading event...</div>
    if (error) return <div>{error}</div>

    return (
        <div style={styles.container}>
            {/* Hero Section */}
            <div style={styles.hero}>
                <img
                    src={event.image || 'default-banner.jpg'} // Use default image if event has none
                    alt={event.title}
                    style={styles.heroImage}
                />
                <div style={styles.heroText}>
                    <h1 style={styles.title}>{event.title}</h1>
                    <p style={styles.subtitle}>
                        {new Date(
                            event?.created_at?.seconds * 1000
                        ).toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Event Details Section */}
            <div style={styles.details}>
                <p style={styles.description}>{event.description}</p>
                <div style={styles.dateTime}>
                    <h4 style={styles.dateTitle}>Date & Time</h4>
                    <p style={styles.dateValue}>
                        {new Date(event?.date?.seconds * 1000).toLocaleString()}
                    </p>
                </div>

                {/* Delete Event Button */}
                {event.user_uid === auth.currentUser?.uid && (
                    <button
                        style={styles.deleteButton}
                        onClick={() => setShowModal(true)}
                    >
                        Delete Event
                    </button>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this event?</p>
                    {deleteError && (
                        <p style={styles.error}>
                            Error deleting event. Please try again.
                        </p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={handleDeleteEvent}
                    >
                        Confirm
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

// Styling for the Event Details Page
const styles = {
    container: {
        padding: '20px',
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        marginTop: '50px',
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
    dateTime: {
        backgroundColor: '#f8f8f8',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '20px',
    },
    dateTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333',
    },
    dateValue: {
        fontSize: '18px',
        color: '#555',
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '8px',
        transition: 'background-color 0.3s',
        marginTop: '20px',
    },
    error: {
        color: 'red',
        fontSize: '14px',
    },
}

export default EventsDetailPage
