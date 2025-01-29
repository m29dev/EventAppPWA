// src/pages/EventsPage.js
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import Navbar from '../components/Navbar'
import Map from '../components/Map'
import DatePickerComponent from '../components/DatePickerComponent'

import { db, auth } from '../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import supabase from '../supabaseClient'
import { clearEvent } from '../redux/eventSlice'

import './styles/eventsCreatePageStyles.css'

const EventsCreatePage = () => {
    const { eventInfo } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()

    const [avatar, setAvatar] = useState()
    const [avatarData, setAvatarData] = useState()
    const [displayError, setDisplayError] = useState()

    const handleAvatarChange = (event) => {
        if (!event.target.files[0]) return

        setAvatarData(event.target.files[0])
        const objectUrl = URL.createObjectURL(event.target.files[0])
        setAvatar(objectUrl)
    }

    const handleCreateEvent = async (e) => {
        try {
            e.preventDefault()

            if (
                !title ||
                !description ||
                !eventInfo?.address ||
                !eventInfo?.date ||
                !eventInfo?.time
            )
                return setDisplayError('Fill out all required data')

            // Upload the image to Supabase Storage
            let imageURI
            if (avatarData) {
                const res = await supabase.storage
                    .from('events')
                    .upload(`${Date.now()}.${avatarData.name}`, avatarData)

                if (!res) return
                if (res?.error) return

                imageURI = res?.data?.path
            }

            const eventUpload = await addDoc(collection(db, 'events'), {
                title,
                description,
                createdAt: new Date(),
                userId: auth.currentUser?.uid,
                image: imageURI ? imageURI : '',
                location: { lat: eventInfo?.lat, lng: eventInfo?.lng },
                address: eventInfo?.address,
                date: eventInfo?.date,
                time: eventInfo?.time,
            })
            setTitle('')
            setDescription('')

            if (!eventUpload) return

            navigate('/events')
            dispatch(clearEvent())
        } catch (error) {
            return setDisplayError('Error while creating event')
        }
    }

    return (
        <div>
            <Navbar />

            <Map />

            <div className="c_box">
                <h3>Create New Event</h3>

                <form className="c_formBox" onSubmit={handleCreateEvent}>
                    {displayError && (
                        <p className="c_textError">{displayError}</p>
                    )}

                    <label htmlFor="title" className="th_label">
                        Title
                    </label>
                    <input
                        id="title"
                        className="c_input"
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
                        className="c_input"
                        type="text"
                        placeholder="Event Location (choose on the map)"
                        value={eventInfo?.address}
                    />

                    <label htmlFor="description" className="th_label">
                        Description
                    </label>
                    <textarea
                        id="description"
                        className="c_textArea"
                        placeholder="Event Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <DatePickerComponent />

                    <div className="c_avatarBox">
                        <label htmlFor="upload">
                            {avatar && (
                                <img
                                    src={avatar}
                                    alt="Account Icon"
                                    className="c_icon"
                                />
                            )}

                            {!avatar && (
                                <p className="c_imgP">Select an event image</p>
                            )}

                            <input
                                accept="image/*"
                                id="upload"
                                type="file"
                                capture="environment"
                                className="c_hidden"
                                onChange={handleAvatarChange}
                            />
                        </label>
                    </div>
                </form>
            </div>

            <div className="c_controlPanel">
                <button
                    id="button_cancel"
                    className="c_button"
                    onClick={() => navigate('/events')}
                >
                    Cancel
                </button>
                <button
                    id="button_create"
                    className="c_button"
                    onClick={handleCreateEvent}
                >
                    Create
                </button>
            </div>
        </div>
    )
}

export default EventsCreatePage
