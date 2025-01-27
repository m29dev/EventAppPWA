import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { store } from './redux/store'
// import * as serviceWorker from './service-worker'
// import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then((reg) => console.log('Service Worker registered:', reg))
            .catch((err) =>
                console.log('Service Worker registration failed:', err)
            )
    })
}

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker
//             .register('sw.js')
//             .then((registration) => {
//                 console.log(
//                     'Service Worker registered with scope:',
//                     registration.scope
//                 )
//             })
//             .catch((error) => {
//                 console.error('Service Worker registration failed:', error)
//             })
//     })
// }

reportWebVitals()
