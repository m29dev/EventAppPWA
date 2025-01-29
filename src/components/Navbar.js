import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './styles/navbarStyles.css'

const Navbar = () => {
    const { user } = useSelector((state) => state.user)
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        if (user) {
            setIsAuth(true)
        }
    }, [user])

    const navigate = useNavigate()

    const handleUserPage = () => {
        navigate('/user')
    }

    return (
        <nav className="navbar">
            <div className="logoContainer" onClick={() => navigate('/')}>
                <img className="logo" src="./logo.png" alt="logo"></img>
                <p className="logoText">evento</p>
            </div>
            <div className="navItems">
                {!isAuth ? (
                    <>
                        <button
                            className="button"
                            onClick={() => navigate('/auth')}
                        >
                            Sign In
                        </button>
                    </>
                ) : (
                    <div className="avatarContainer" onClick={handleUserPage}>
                        <div className="avatar">
                            {user?.email?.slice(0, 1)?.toUpperCase()}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
