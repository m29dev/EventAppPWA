// src/pages/EventsPage.js
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import Navbar from '../components/Navbar'
import Map from '../components/Map'
import DatePickerComponent from '../components/DatePickerComponent'

import { db, auth } from '../firebaseConfig'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import supabase from '../supabaseClient'
import { clearEvent } from '../redux/eventSlice'

import './styles/eventsEditPageStyles.css'

const EventsEditPage = () => {
    const { eventInfo } = useSelector((state) => state.user)
    const { id } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [avatar, setAvatar] = useState()
    const [avatarOld, setAvatarOld] = useState()
    const [avatarData, setAvatarData] = useState()
    const [event, setEvent] = useState(null)
    const [error, setError] = useState(null)

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

            if (!eventInfo) return

            let imageURI

            // Upload the image to Supabase Storage
            if (avatar) {
                const res = await supabase.storage
                    .from('events')
                    .upload(`${Date.now()}.${avatarData.name}`, avatarData)

                if (!res) return
                if (res?.error) return

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

            navigate('/events')
            dispatch(clearEvent())
        } catch (error) {
            setError('Error while creating event')
        }
    }

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
                } else {
                    setError('Event not found.')
                }
            } catch (error) {
                setError('Error fetching event data.')
            }
        }

        fetchEvent()
    }, [id])

    return (
        <div>
            <Navbar />

            <Map />

            <div className="ed_box">
                <h3>Edit Event</h3>

                <form className="ed_formBox" onSubmit={handleEditEvent}>
                    {error && <p className="ed_textError">{error}</p>}

                    <label htmlFor="title" className="th_label">
                        Title
                    </label>
                    <input
                        id="title"
                        className="ed_input"
                        type="text"
                        placeholder="Event Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label htmlFor="address" className="th_label">
                        Address
                    </label>
                    <input
                        id="address"
                        className="ed_input"
                        type="text"
                        placeholder="Event Location (choose on the map)"
                        value={eventInfo?.address}
                    />

                    <label htmlFor="description" className="th_label">
                        Description
                    </label>
                    <textarea
                        id="description"
                        className="ed_textArea"
                        placeholder="Event Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <DatePickerComponent />

                    <div className="ed_avatarBox">
                        <label for="upload">
                            {(avatar || avatarOld) && (
                                <img
                                    src={avatar ? avatar : avatarOld}
                                    alt="Account Icon"
                                    className="ed_icon"
                                />
                            )}

                            {!avatar && (
                                <p className="ed_imgP">Select an event image</p>
                            )}

                            <input
                                accept="image/*"
                                id="upload"
                                type="file"
                                capture="environment"
                                className="ed_hidden"
                                onChange={handleAvatarChange}
                            />
                        </label>
                    </div>
                </form>
            </div>

            <div className="ed_controlPanel">
                <button
                    id="button_cancel"
                    className="ed_button"
                    onClick={() => navigate('/events')}
                >
                    Cancel
                </button>
                <button
                    id="button_save"
                    className="ed_button"
                    onClick={handleEditEvent}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default EventsEditPage
