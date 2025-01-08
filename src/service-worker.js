/* eslint-disable no-restricted-globals */

import { precacheAndRoute } from 'workbox-precaching'

// Generuj pliki do cache
precacheAndRoute(self.__WB_MANIFEST)

const CACHE_NAME = 'pwa-cache-v1'
const urlsToCache = [
    '/',
    '/index.html',
    '/static/js/main.js',
    '/static/css/main.css',
]

// Instalacja Service Workera
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Cache opened')
            return cache.addAll(urlsToCache)
        })
    )
})

// Pobieranie zasobów z Cache
self.addEventListener('fetch', (event) => {
    // Wyklucz żądania POST
    if (event.request.method === 'POST') {
        return
    }

    // Obsługa innych metod (GET itp.)
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request)
        })
    )
})

// Aktualizacja Cache
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME]
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName)
                    }
                    // return 1
                })
            )
        )
    )
})

// async function networkFirst(request) {
//     try {
//         const networkResponse = await fetch(request)
//         if (networkResponse.ok) {
//             const cache = await caches.open('cache_1')
//             cache.put(request, networkResponse.clone())
//         }
//         return networkResponse
//     } catch (error) {
//         const cachedResponse = await caches.match(request)
//         return cachedResponse || Response.error()
//     }
// }

// self.addEventListener('fetch', (event) => {
//     const url = new URL(event.request.url)
//     if (url.pathname.match(/^\//)) {
//         event.respondWith(networkFirst(event.request))
//         console.log('s-w, matched uri')
//     }
// })

// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         caches.open('my-pwa-cache').then((cache) => {
//             return cache.addAll([
//                 '/',
//                 '/index.html',
//                 '/manifest.json',
//                 '/static/js/bundle.js',
//                 // Add other assets and routes to cache
//             ])
//         })
//     )
// })
// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request).then((response) => {
//             return response || fetch(event.request)
//         })
//     )
// })

// // Establish a cache name
// const cacheName = 'de_cache_1'

// self.addEventListener('install', (event) => {
//     event.waitUntil(caches.open(cacheName))
// })

// self.addEventListener('fetch', async (event) => {
//     // Is this a request for an image?
//     if (event.request.destination === 'image') {
//         // Open the cache
//         event.respondWith(
//             caches.open(cacheName).then((cache) => {
//                 // Respond with the image from the cache or from the network
//                 return cache.match(event.request).then((cachedResponse) => {
//                     return (
//                         cachedResponse ||
//                         fetch(event.request.url).then((fetchedResponse) => {
//                             // Add the network response to the cache for future visits.
//                             // Note: we need to make a copy of the response to save it in
//                             // the cache and use the original as the request response.
//                             cache.put(event.request, fetchedResponse.clone())

//                             // Return the network response
//                             return fetchedResponse
//                         })
//                     )
//                 })
//             })
//         )
//     } else {
//         return
//     }
// })
