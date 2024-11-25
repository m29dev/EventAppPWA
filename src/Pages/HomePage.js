import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const HomePage = () => {
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()

    // Funkcja nawigująca do odpowiednich stron
    const handleNavigate = () => {
        if (user) {
            // Jeśli użytkownik jest zalogowany, przenieś go do wydarzeń
            navigate('/events')
        } else {
            // Jeśli użytkownik nie jest zalogowany, przenieś go do strony logowania
            navigate('/auth')
        }
    }

    return (
        <div>
            <Navbar />

            <div style={styles.container}>
                <h1 style={styles.header}>Your Ultimate Event Companion</h1>
                <p style={styles.description}>
                    Welcome to EventApp, the ultimate platform for discovering,
                    managing, and attending events that matter to you! Whether
                    you're looking to organize your own events, attend exciting
                    local happenings, or stay on top of your community’s social
                    calendar, EventApp has got you covered.
                </p>

                <div style={styles.cta}>
                    <button onClick={handleNavigate} style={styles.button}>
                        {user ? 'Events' : 'Auth'}
                    </button>
                </div>
            </div>
        </div>
    )
}

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
    },
    header: {
        fontSize: '2.5rem',
        marginBottom: '20px',
        color: '#4CAF50',
    },
    description: {
        fontSize: '1.2rem',
        marginBottom: '30px',
        color: '#555',
    },
    cta: {
        marginTop: '20px',
    },
    button: {
        padding: '12px 24px',
        backgroundColor: '#4CAF50',
        color: 'white',
        fontSize: '1.1rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
}

export default HomePage
