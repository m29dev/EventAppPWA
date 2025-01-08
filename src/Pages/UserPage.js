import React from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/userSlice'

const UserPage = () => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleSignOut = () => {
        localStorage.removeItem('userInfo')
        navigate('/auth')

        dispatch(setUser(null))
    }

    return (
        <>
            <Navbar></Navbar>

            <div style={styles.container}>
                <h1>user: {user?.email}</h1>
            </div>

            <div style={styles.controlPanel}>
                <button style={styles.button} onClick={() => navigate('/')}>
                    Home
                </button>
                <button style={styles.button} onClick={handleSignOut}>
                    Sign Out
                </button>
            </div>
        </>
    )
}

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
        marginLeft: '20px',
        marginRight: '20px',
        flex: 1,
        height: '50px',
        borderRadius: '50px',
        backgroundColor: '#333330',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    avatarBox: {
        height: '100px',
        width: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    icon: {
        height: '64px',
        width: '64px',
        borderRadius: '50%',
    },

    hidden: { display: 'none' },

    iconBox: {
        height: '30px',
        width: '30px',
    },

    container: {
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        // minHeight: 'calc(100vh - 60px)',
        minHeight: 'calc(100vh - 150px - 60px)',
        height: '100%',
        // maxHeight: 'calc(100vh - 60px)',
        textAlign: 'center',
        // backgroundColor: '#f4f4f9',
        fontFamily: 'Arial, sans-serif',
        // overflowY: 'auto', // Enable vertical scroll
        flex: 1,
    },

    label: {
        display: 'block',
        marginBottom: '5px',
    },
}

export default UserPage
