import React, { useEffect } from 'react'
import { useSelector } from 'react-redux' // Zakładając, że stan użytkownika jest w Reduxie
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConfig'

const Navbar = () => {
    const { user } = useSelector((state) => state.user) // Pobieramy stan z Redux

    useEffect(() => {
        console.log(user)
    }, [user])

    const navigate = useNavigate()

    const handleUserPage = () => {
        navigate('/user')
    }

    useEffect(() => {
        console.log('FIREBASE AUTH: ', auth.currentUser)
    }, [])

    return (
        <nav style={styles.navbar}>
            <div style={styles.logoContainer}>
                <img style={styles.logo} src="./logo.png" alt="logo"></img>
                {/* <h1 style={styles.logoText}>EV</h1> */}
            </div>
            <div style={styles.navItems}>
                {!user ? (
                    <>
                        <button
                            style={styles.button}
                            onClick={() => navigate('/auth')}
                        >
                            Auth
                        </button>
                    </>
                ) : (
                    <div
                        style={styles.avatarContainer}
                        onClick={handleUserPage}
                    >
                        <div style={styles.avatar}>{1}</div>
                    </div>
                )}
            </div>
        </nav>
    )
}

const styles = {
    logo: {
        height: '30px',
        width: '30px',
        marginRight: '20px',
    },

    logoText: {
        height: '40px',
        width: '40px',
        margin: '0px',
        padding: '0px',
        textAlign: 'center',
        textJustify: 'center',
        fontSize: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
    },

    navItems: {
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '8px 16px',
        marginLeft: '10px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    avatarContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#6c757d',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        fontWeight: 'bold',
        marginLeft: '10px',
        cursor: 'pointer',
    },
}

export default Navbar
