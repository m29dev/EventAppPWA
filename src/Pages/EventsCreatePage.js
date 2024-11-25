// src/pages/EventsPage.js
import React, { useEffect, useState } from 'react'
import { db, auth } from '../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import supabase from '../supabaseClient'
import Map from '../components/Map'
import { useSelector } from 'react-redux'
import { overlay } from '@cloudinary/url-gen/qualifiers/blendMode'
import { justify } from '@cloudinary/url-gen/qualifiers/textAlignment'
import { hover } from '@testing-library/user-event/dist/hover'
import DatePickerComponent from '../components/DatePickerComponent'

const EventsCreatePage = () => {
    const { eventInfo } = useSelector((state) => state.user)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()

    const [avatar, setAvatar] = useState()
    const [avatarData, setAvatarData] = useState()

    const handleAvatarChange = (event) => {
        if (!event.target.files[0]) return

        console.log('AVATAR INFO: ', Date.now(), event.target.files[0])

        setAvatarData(event.target.files[0])
        const objectUrl = URL.createObjectURL(event.target.files[0])
        setAvatar(objectUrl)
    }

    const handleCreateEvent = async (e) => {
        try {
            e.preventDefault()

            if (!title || !description) return

            const eventInfo = localStorage.getItem('eventInfo')
                ? JSON.parse(localStorage.getItem('eventInfo'))
                : null

            if (!eventInfo) return console.log('choose event place')
            console.log(1234, eventInfo)
            // run img upload
            // check if new image
            console.log('saving the changes: ', avatar)

            // Upload the image to Supabase Storage
            const res = await supabase.storage
                .from('events') // 'images' is your storage bucket name
                .upload(`${Date.now()}.${avatarData.name}`, avatarData)

            if (!res) return console.log('upload error')
            if (res?.error) return console.log(res?.error)

            const imageURI = res?.data?.path
            console.log('UPLOADED AVATAR: ', imageURI)

            const eventUpload = await addDoc(collection(db, 'events'), {
                title,
                description,
                createdAt: new Date(),
                userId: auth.currentUser?.uid,
                image: imageURI,
                location: { lat: eventInfo.lat, lng: eventInfo.lng },
                address: eventInfo.address,
                date: eventInfo.date,
                time: eventInfo.time,
            })
            setTitle('')
            setDescription('')

            if (!eventUpload) return console.log('could not create event')

            navigate('/events')
        } catch (error) {
            alert('Error creating event: ' + error.message)
        }
    }

    useEffect(() => {
        console.log(eventInfo)
    }, [eventInfo])

    return (
        <div>
            <Navbar />

            <Map />

            <div style={styles.box}>
                <h3>Create New Event</h3>

                <form style={styles.formBox} onSubmit={handleCreateEvent}>
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
                            {avatar && (
                                <img
                                    src={avatar}
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
                <button style={styles.button} onClick={handleCreateEvent}>
                    Create
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

export default EventsCreatePage
