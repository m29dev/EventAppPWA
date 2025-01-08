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
                <h1 style={styles.title}>evento</h1>
                <h3 style={styles.header}>Ultimate Event Companion</h3>
                <p style={styles.description}>
                    Welcome to evento, the ultimate platform for discovering,
                    managing, and attending events that matter to you! Whether
                    you're looking to organize your own events, attend exciting
                    local happenings, or stay on top of your community’s social
                    calendar, evento has got you covered.
                </p>

                {/* <div style={styles.cta}>
                    <button onClick={handleNavigate} style={styles.button}>
                        {user ? 'Events' : 'Auth'}
                    </button>
                </div> */}
            </div>

            <div style={styles.controlPanel}>
                <button
                    style={styles.buttonPanel}
                    onClick={() => navigate(`/events`)}
                >
                    let's start
                    <img style={styles.logo} src="./logo.png" alt="logo"></img>
                </button>
            </div>
        </div>
    )
}

const styles = {
    logo: {
        height: '20px',
        width: '20px',
        marginLeft: '10px',
    },

    buttonPanel: {
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
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    controlPanel: {
        height: '50px',
        borderRadius: '50px',
        width: '150px',
        backgroundColor: '#333330',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 'auto',
    },

    title: {
        fontSize: '70px',
        textAlign: 'center',
    },
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
    },
    header: {
        fontSize: '1.5rem',
        marginBottom: '20px',

        // color: '#4CAF50',

        textAlign: 'center',
    },
    description: {
        fontSize: '1rem',
        marginBottom: '30px',
        padding: '30px',
        color: '#555',
    },
    cta: {
        marginTop: '20px',
    },
    button: {
        padding: '12px 24px',
        // backgroundColor: '#4CAF50',
        color: 'white',
        fontSize: '1.1rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
}

export default HomePage
