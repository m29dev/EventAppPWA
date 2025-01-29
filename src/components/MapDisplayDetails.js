import React from 'react'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css' // Leaflet CSS
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const MapDisplayDetails = (mapLocalization) => {
    // Set up the default icon for markers
    const DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
    })

    L.Marker.prototype.options.icon = DefaultIcon

    return (
        <>
            {mapLocalization && (
                <MapContainer
                    center={{
                        lat: mapLocalization?.mapLocalization?.lat,
                        lng: mapLocalization?.mapLocalization?.lng,
                    }}
                    zoom={13}
                    style={{ height: '300px', width: '100%' }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    <Marker
                        position={{
                            lat: mapLocalization?.mapLocalization?.lat,
                            lng: mapLocalization?.mapLocalization?.lng,
                        }}
                    >
                        <Popup>Event</Popup>
                    </Marker>
                </MapContainer>
            )}
        </>
    )
}

export default MapDisplayDetails
