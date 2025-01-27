import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux' // Zakładając, że stan użytkownika jest w Reduxie
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const { user } = useSelector((state) => state.user) // Pobieramy stan z Redux
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        console.log(user)
        if (user) {
            setIsAuth(true)
        }
    }, [user])

    const navigate = useNavigate()

    const handleUserPage = () => {
        navigate('/user')
    }

    return (
        <nav style={styles.navbar}>
            <div style={styles.logoContainer} onClick={() => navigate('/')}>
                <img style={styles.logo} src="./logo.png" alt="logo"></img>
                <p style={styles.logoText}>evento</p>
            </div>
            <div style={styles.navItems}>
                {!isAuth ? (
                    <>
                        <button
                            style={styles.button}
                            onClick={() => navigate('/auth')}
                        >
                            Sign In
                        </button>
                    </>
                ) : (
                    <div
                        style={styles.avatarContainer}
                        onClick={handleUserPage}
                    >
                        <div style={styles.avatar}>
                            {user?.email?.slice(0, 1)?.toUpperCase()}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

const styles = {
    button: {
        // padding: '3px 24px', // Space around the text
        fontSize: '16px', // Text size
        height: '40px',
        width: '80px',
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

    logo: {
        height: '30px',
        width: '30px',
        marginRight: '20px',
    },

    logoText: {
        height: '40px',
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
        borderRadius: '0px 0px 23px 23px',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },

    navItems: {
        display: 'flex',
        alignItems: 'center',
    },
    // button: {
    //     backgroundColor: '#007bff',
    //     color: 'white',
    //     border: 'none',
    //     borderRadius: '5px',
    //     padding: '8px 16px',
    //     marginLeft: '10px',
    //     cursor: 'pointer',
    //     fontSize: '14px',
    // },
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
