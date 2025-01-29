import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'

import MapDisplayDetails from '../components/MapDisplayDetails'
import Navbar from '../components/Navbar'

import { db, doc, getDoc, deleteDoc } from '../firebaseConfig'

import './styles/eventsDetailPageStyles.css'

const EventsDetailPage = () => {
    const { id } = useParams()
    const { user } = useSelector((state) => state.user)
    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

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
            if (event.userId !== user?.id) {
                return setError('You are not authorized to delete this event')
            }

            await deleteDoc(doc(db, 'events', id))
            navigate('/events')
        } catch (error) {
            return setError('error, could not delete event')
        }
    }

    return (
        <div>
            <Navbar />

            {loading && <div className="dtl_loading">Loading event...</div>}
            {error && <div>{error}</div>}

            <div className="dtl_container">
                <div className="dtl_boxLeft">
                    <img
                        src={`
                                    https://xegmsphprxsopaotcvpj.supabase.co/storage/v1/object/public/events/${event?.image}
                                    `}
                        alt="Account Icon"
                        className="dtl_icon"
                    />
                </div>
                <div className="dtl_boxRight">
                    <h1 className="dtl_title">{event?.title}</h1>
                    <p className="dtl_description">
                        Description: {event?.description}
                    </p>
                    <p className="dtl_description">
                        Location: {event?.address}
                    </p>
                </div>
            </div>
            {event && <MapDisplayDetails mapLocalization={event?.location} />}

            {event?.userId === user?.id && (
                <div className="dtl_controlPanel">
                    <button
                        className="dtl_button"
                        onClick={() => navigate(`/events/${id}/edit`)}
                    >
                        Edit
                    </button>
                    <button className="dtl_button" onClick={handleDeleteEvent}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}

export default EventsDetailPage
