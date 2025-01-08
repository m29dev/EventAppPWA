// src/pages/EventsPage.js
import React, { useEffect, useState } from 'react'
import { db, auth } from '../firebaseConfig'
import { collection, addDoc, getDoc, doc, updateDoc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import supabase from '../supabaseClient'
import Map from '../components/Map'
import { useSelector } from 'react-redux'
import DatePickerComponent from '../components/DatePickerComponent'

const EventsEditPage = () => {
    const { eventInfo, user } = useSelector((state) => state.user)
    const { id } = useParams()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()

    const [avatar, setAvatar] = useState()
    const [avatarOld, setAvatarOld] = useState()
    const [avatarData, setAvatarData] = useState()

    const handleAvatarChange = (event) => {
        if (!event.target.files[0]) return

        setAvatarData(event.target.files[0])
        const objectUrl = URL.createObjectURL(event.target.files[0])
        setAvatar(objectUrl)
    }

    const handleEditEvent = async (e) => {
        try {
            e.preventDefault()

            if (!title || !description) return

            const eventInfo = localStorage.getItem('eventInfo')
                ? JSON.parse(localStorage.getItem('eventInfo'))
                : null

            if (!eventInfo) return console.log('choose event place')
            // run img upload
            // check if new image

            let imageURI

            // Upload the image to Supabase Storage
            if (avatar) {
                const res = await supabase.storage
                    .from('events') // 'images' is your storage bucket name
                    .upload(`${Date.now()}.${avatarData.name}`, avatarData)

                if (!res) return console.log('upload error')
                if (res?.error) return console.log(res?.error)

                imageURI = res?.data?.path
            } else {
                imageURI = event?.image
            }

            const newObject = {
                title,
                description,
                createdAt: event?.createdAt,
                updatedAt: new Date(),
                userId: auth.currentUser?.uid,
                image: imageURI,
                location: { lat: eventInfo.lat, lng: eventInfo.lng },
                address: eventInfo.address,
                date: eventInfo.date,
                time: eventInfo.time,
            }

            // Get a reference to the document
            const docRef = doc(db, 'events', id)

            // Update the document
            await updateDoc(docRef, newObject)

            console.log('Document updated successfully!')
            navigate('/events')

            localStorage.removeItem('eventInfo')
        } catch (error) {
            alert('Error creating event: ' + error.message)
        }
    }

    useEffect(() => {
        console.log(eventInfo)
    }, [eventInfo])

    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventDoc = doc(db, 'events', id)
                const docSnap = await getDoc(eventDoc)

                if (docSnap.exists()) {
                    setEvent(docSnap.data())
                    setTitle(docSnap.data().title)
                    setDescription(docSnap.data().description)
                    setAvatarOld(
                        `
                                    https://xegmsphprxsopaotcvpj.supabase.co/storage/v1/object/public/events/${
                                        docSnap.data().image
                                    }
                                    `
                    )
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

    return (
        <div>
            <Navbar />

            <Map />

            <div style={styles.box}>
                <h3>Edit Event</h3>

                <form style={styles.formBox} onSubmit={handleEditEvent}>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Event Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Event Location (choose on the map)"
                        value={eventInfo?.address}
                    />
                    <textarea
                        style={styles.textArea}
                        placeholder="Event Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <DatePickerComponent />

                    <div style={styles.avatarBox}>
                        <label for="upload">
                            {(avatar || avatarOld) && (
                                <img
                                    src={avatar ? avatar : avatarOld}
                                    alt="Account Icon"
                                    style={styles.icon}
                                />
                            )}

                            {!avatar && (
                                <p style={styles.imgP}>Select an event image</p>
                            )}

                            <input
                                accept="image/*"
                                id="upload"
                                type="file"
                                capture="environment"
                                style={styles.hidden}
                                onChange={handleAvatarChange}
                            />
                        </label>
                    </div>
                </form>
            </div>

            <div style={styles.controlPanel}>
                <button
                    style={styles.button}
                    onClick={() => navigate('/events')}
                >
                    Cancel
                </button>
                <button style={styles.button} onClick={handleEditEvent}>
                    Save
                </button>
            </div>
        </div>
    )
}

// Styles for the Event Details Page
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

    imgP: {
        textAlign: 'center',
    },

    formBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textArea: {
        height: '100px',
        width: '90%',
        borderRadius: '21px',
        border: '1px solid gray',
        marginBottom: '20px',
        padding: '10px',
    },

    input: {
        width: '90%',
        height: '30px',
        borderRadius: '21px',
        border: '1px solid gray',
        marginBottom: '20px',
        padding: '10px',
    },

    avatarBox: {
        height: '200px',
        width: '200px',
        borderRadius: '21px',
        border: '1px solid gray',
        overflow: 'hidden',
    },

    hidden: {
        display: 'none',
    },

    box: {
        marginLeft: '20px',
        marginRight: '20px',
    },

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

    icon: {
        height: '300px',
        width: '300px',
    },
}

export default EventsEditPage
