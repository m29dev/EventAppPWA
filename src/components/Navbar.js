import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux' // Zakładając, że stan użytkownika jest w Reduxie
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [user] = useSelector((state) => state.user) // Pobieramy stan z Redux

    useEffect(() => {
        console.log(user)
    }, [user])

    const navigate = useNavigate()

    // const handleSignOut = () => {
    //     if (onSignOut) onSignOut()
    //     navigate('/auth') // Przekierowanie do strony logowania po wylogowaniu
    // }

    const handleUserPage = () => {
        console.log('userPage')
        navigate('/user')
    }

    return (
        <nav style={styles.navbar}>
            <div style={styles.logoContainer}>
                <h1 style={styles.logo}>EventApp</h1>
            </div>
            <div style={styles.navItems}>
                {!user ? (
                    <>
                        <button
                            style={styles.button}
                            onClick={() => navigate('/auth/signin')}
                        >
                            Sign In
                        </button>
                        <button
                            style={styles.button}
                            onClick={() => navigate('/auth/signup')}
                        >
                            Sign Up
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
    logo: {
        margin: 0,
        fontSize: '24px',
        fontWeight: 'bold',
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
