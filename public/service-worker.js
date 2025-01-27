/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'eventoCache'
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/static/js/bundle.js',
    '/static/js/main.js',
    '/static/js/main.chunk.js',
    '/static/js/0.chunk.js',
    '/static/css/main.chunk.css',
    '/manifest.json',
    '/favicon.ico',
    '/manifest-icon-192.maskable.png',
    '/manifest-icon-512.maskable.png',
]

// install sw
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS)
        })
    )
})

// fetch sw offline-first
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return (
                cachedResponse ||
                fetch(event.request).catch(() => {
                    return caches.match('/index.html') // Fallback for SPA
                })
            )
        })
    )
})

// update sw
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})
