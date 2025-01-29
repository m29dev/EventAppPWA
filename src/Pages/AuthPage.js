import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Navbar from '../components/Navbar'

import { setUser } from '../redux/userSlice'
import { useDispatch } from 'react-redux'

import { auth } from '../firebaseConfig'
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth'

import './styles/authPageStyles.css'

const AuthPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [signIn, setSignIn] = useState(true)

    const switchAuth = () => {
        setSignIn((state) => !state)

        // Reset fields
        setEmail('')
        setPassword('')
        setError('')
    }

    const handleAuth = async (e) => {
        e.preventDefault()

        try {
            // validate if email / password is not null
            if (!email || !password) {
                return setError('Please fill in all fields.')
            }

            // validate email pattern
            const emailPattern =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if (!email || !emailPattern.test(email)) {
                return setError('Please enter a valid email address')
            }

            if (!signIn) {
                // validate password length
                if (password.length < 6) {
                    return setError(
                        'Password must be at least 6 characters length'
                    )
                }

                const user = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                )

                const userObject = {
                    id: user.user.uid,
                    email: user.user.email,
                    accessToken: user.user.accessToken,
                }

                // set state
                dispatch(setUser(userObject))
            } else {
                const user = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                )

                const userObject = {
                    id: user.user.uid,
                    email: user.user.email,
                    accessToken: user.user.accessToken,
                }

                // set state
                dispatch(setUser(userObject))
            }

            navigate('/events')
        } catch (error) {
            if (signIn) {
                setError('Wrong email or password')
            } else {
                setError('Could not create an account, try again later')
            }
        }
    }

    return (
        <div>
            <Navbar />

            <div className="th_container">
                {signIn ? <h1>Sign In</h1> : <h1>Create an account</h1>}

                {error && <p className="th_error">{error}</p>}

                <div className="th_inputContainer">
                    <label htmlFor="email" className="th_label">
                        Email:
                    </label>
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="th_input"
                        required
                    />
                </div>
                <div className="th_inputContainer">
                    <label htmlFor="password" className="th_label">
                        Password:
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="th_input"
                        required
                    />
                </div>

                {signIn && (
                    <div className="th_btnBox">
                        <button
                            id="button_submit"
                            type="submit"
                            onClick={handleAuth}
                            className="th_button"
                        >
                            Sign In
                        </button>

                        <button
                            id="button_switch"
                            onClick={switchAuth}
                            className="th_buttonSecond"
                        >
                            Don't have an account yet?
                        </button>
                    </div>
                )}

                {!signIn && (
                    <div className="th_btnBox">
                        <button
                            id="button_submit"
                            type="submit"
                            onClick={handleAuth}
                            className="th_button"
                        >
                            Sign Up
                        </button>

                        <button
                            id="button_switch"
                            onClick={switchAuth}
                            className="th_buttonSecond"
                        >
                            have an account already?
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AuthPage
