const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = {
    plugins: [
        new InjectManifest({
            swSrc: './src/service-worker.js', // Ścieżka do Twojego Service Workera
            swDest: 'service-worker.js', // Wygenerowany plik Service Workera
        }),
    ],
}
