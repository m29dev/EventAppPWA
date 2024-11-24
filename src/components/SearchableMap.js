import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css' // Leaflet CSS
import 'leaflet-control-geocoder/dist/Control.Geocoder.js' // Geocoding library

const SearchableMap = () => {
    const [location, setLocation] = useState(null) // To store the geocoded location

    useEffect(() => {
        // Set up the map
        const map = L.map('map', {
            center: [37.7749, -122.4194], // Default coordinates (San Francisco)
            zoom: 13,
        })

        // Add Tile Layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
            map
        )

        // Add Geocoding Control (Search bar)
        const geocoder = L.Control.Geocoder.nominatim()
        L.Control.geocoder({
            geocoder,
            position: 'topright',
            placeholder: 'Search for an address...',
            errorMessage: 'Address not found',
            collapsed: true,
        }).addTo(map)

        // Event listener for when the geocoder returns results
        const onGeocodeResult = (results) => {
            if (results && results.length > 0) {
                const result = results[0]
                const { lat, lng } = result.center // Get latitude and longitude
                setLocation({ lat, lng })
                map.setView([lat, lng], 14) // Center map on the result
                L.marker([lat, lng])
                    .addTo(map)
                    .bindPopup(result.name)
                    .openPopup()
            }
        }

        // Add geocode result event listener
        geocoder.on('markgeocode', (e) => {
            onGeocodeResult(e.geocode)
        })

        return () => {
            map.remove()
        }
    }, [])

    return (
        <div>
            <h2>Search Address on Map</h2>
            <div id="map" style={{ height: '400px', width: '100%' }}></div>
            {location && (
                <div>
                    <h3>Location Details:</h3>
                    <p>Latitude: {location.lat}</p>
                    <p>Longitude: {location.lng}</p>
                </div>
            )}
        </div>
    )
}

export default SearchableMap
