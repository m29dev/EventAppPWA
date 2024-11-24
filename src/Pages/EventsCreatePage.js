// src/pages/EventsPage.js
import React, { useState, useEffect } from 'react'
import { db, auth } from '../firebaseConfig'
import { collection, addDoc, getDocs, orderBy } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import supabase from '../supabaseClient'
import SearchableMap from '../components/SearchableMap'
import Map from '../components/Map'

const EventsCreatePage = () => {
    const [events, setEvents] = useState([])
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

            const event = await addDoc(collection(db, 'events'), {
                title,
                description,
                createdAt: new Date(),
                userId: auth.currentUser?.uid,
                image: imageURI,
            })
            setTitle('')
            setDescription('')

            if (!event) return console.log('could not create event')

            navigate('/events')
        } catch (error) {
            alert('Error creating event: ' + error.message)
        }
    }

    return (
        <div>
            <Navbar />

            <Map />

            {auth.currentUser ? (
                <div style={styles.box}>
                    <h3>Create New Event</h3>

                    <form onSubmit={handleCreateEvent}>
                        <input
                            type="text"
                            placeholder="Event Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            style={styles.textArea}
                            placeholder="Event Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <div style={styles.avatarBox}>
                            <label for="upload">
                                <img
                                    src={avatar ? avatar : ``}
                                    alt="Account Icon"
                                    style={styles.icon}
                                />

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

                        <button type="submit">Create Event</button>
                    </form>
                </div>
            ) : (
                <p>Please sign in to create events.</p>
            )}
        </div>
    )
}

// Styles for the Event Details Page
const styles = {
    box: {
        marginLeft: '20px',
        marginRight: '20px',
    },

    textArea: {
        height: '100px',
        width: '100%',
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
