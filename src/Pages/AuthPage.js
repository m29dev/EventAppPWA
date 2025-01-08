// src/pages/AuthPage.js
import React, { useState } from 'react'
import { auth } from '../firebaseConfig'
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { setUser } from '../redux/userSlice'
import { useDispatch } from 'react-redux'

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

        console.log('HANDLE AUTH: ', email, password)

        try {
            if (!email || !password) {
                setError('Please fill in all fields.')
                return
            }

            if (!signIn) {
                console.log('SIGN UP')

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
                }

                localStorage.setItem('userInfo', JSON.stringify(userObject))
            } else {
                console.log('SIGN IN')

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
                }

                dispatch(setUser(userObject))
                localStorage.setItem('userInfo', JSON.stringify(userObject))
            }

            navigate('/events')
        } catch (error) {
            if (signIn) {
                setError('Wrong email or password')
            } else {
                setError(
                    'check email address or / and password length (at least 6 characters)'
                )
            }
        }
    }

    return (
        <div>
            <Navbar />

            <div style={styles.container}>
                {signIn ? <h1>Sign In</h1> : <h1>Create an account</h1>}

                {error && <p style={styles.error}>{error}</p>}

                <div style={styles.inputContainer}>
                    <label style={styles.label}>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputContainer}>
                    <label style={styles.label}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>

                {signIn && (
                    <div style={styles.btnBox}>
                        <button
                            type="submit"
                            onClick={handleAuth}
                            style={styles.button}
                        >
                            Sign In
                        </button>

                        <button
                            onClick={switchAuth}
                            style={styles.buttonSecond}
                        >
                            Don't have an account yet?
                        </button>
                    </div>
                )}

                {!signIn && (
                    <div style={styles.btnBox}>
                        <button
                            type="submit"
                            onClick={handleAuth}
                            style={styles.button}
                        >
                            Sign Up
                        </button>

                        <button
                            onClick={switchAuth}
                            style={styles.buttonSecond}
                        >
                            have an account already?
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

const styles = {
    container: {
        padding: '40px',
        // backgroundColor: '#f4f4f9',
        // border: '1px solid #ccc',
        borderRadius: '5px',
        marginTop: '40px',
        margin: 'auto',
        height: '100%',
    },
    inputContainer: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        height: '30px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    btnBox: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonSecond: {
        padding: '10px 15px',
        backgroundColor: '#777777',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    error: {
        color: 'red',
    },
}

export default AuthPage
