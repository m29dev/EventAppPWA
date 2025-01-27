/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'eventoCache'
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/static/js/bundle.js',
    '/static/js/main.js',
    '/static/js/main.chunk.js',
    '/static/js/0.chunk.js',
    'static/js/*',
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
            console.log('Caching assets...')
            return cache.addAll(STATIC_ASSETS)
        })
    )
})

// fetch sw
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                console.log(cachedResponse)
                return cachedResponse
            }

            return fetch(event.request).catch(() => {
                if (event.request.url.endsWith('.js')) {
                    return caches.match('/index.html')
                }
                return caches.match('/index.html') // Fallback for SPA
            })
        })
    )
})
