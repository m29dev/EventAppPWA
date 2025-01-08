import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css' // Leaflet CSS
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const MapDisplayDetails = (data) => {
    // Set up the default icon for markers
    const DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
    })

    L.Marker.prototype.options.icon = DefaultIcon

    return (
        <>
            <MapContainer
                center={{ lat: data.data.lat, lng: data.data.lng }}
                zoom={13}
                style={{ height: '300px', width: '100%' }}
            >
                <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={{ lat: data.data.lat, lng: data.data.lng }}>
                    <Popup>Event</Popup>
                </Marker>
            </MapContainer>
        </>
    )
}

export default MapDisplayDetails
