// src/pages/AuthPage.js
import React, { useState } from 'react'
import { auth } from '../firebaseConfig'
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const AuthPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignUp, setIsSignUp] = useState(false)
    const navigate = useNavigate()

    const handleAuth = async (e) => {
        e.preventDefault()

        try {
            if (isSignUp) {
                const user = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
                console.log(user)

                const userObject = {
                    id: user.user.uid,
                    email: user.user.email,
                    accessToken: user.user.accessToken,
                    // avatar: dataUser.data[0].avatar,
                }

                localStorage.setItem('userInfo', JSON.stringify(userObject))
            } else {
                const user = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
                console.log(user)

                const userObject = {
                    id: user.user.uid,
                    email: user.user.email,
                    accessToken: user.user.accessToken,
                    // avatar: dataUser.data[0].avatar,
                }

                localStorage.setItem('userInfo', JSON.stringify(userObject))
            }
            navigate('/events')
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div>
            <Navbar />

            <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
            <form onSubmit={handleAuth}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
            </form>
            <button onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
            </button>
        </div>
    )
}

export default AuthPage
