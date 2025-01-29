import React, { useEffect, useState } from 'react'

import { setEventInfo } from '../redux/eventSlice'
import { useDispatch } from 'react-redux'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useMapEvents } from 'react-leaflet/hooks'
import 'leaflet/dist/leaflet.css' // Leaflet CSS
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const Map = () => {
    const [position, setPosition] = useState(null)
    const dispatch = useDispatch()

    const getAddress = async (lat, lng) => {
        if (!lat || !lng) return

        const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`

        try {
            const response = await fetch(apiUrl)
            const data = await response.json()

            // If a valid response is returned, set the address
            if (data && data.address) {
                const formattedAddress = `ul. ${data.address.road} ${
                    data.address.house_number ? data.address.house_number : ''
                }, ${data.address.town}, ${data.address.country}`

                const eventObject = {
                    lat: position.lat,
                    lng: position.lng,
                    address: formattedAddress,
                }

                dispatch(setEventInfo(eventObject))
            } else {
                return
            }
        } catch (error) {
            return
        }
    }

    useEffect(() => {
        if (!position) return
        getAddress(position.lat, position.lng)
    }, [position])

    const LocationMarker = () => {
        const map = useMapEvents({
            click(e) {
                if (!position) {
                    map.locate()
                } else {
                    setPosition(e.latlng)
                    map.flyTo(e.latlng, map.getZoom())
                    return
                }
            },
            locationfound(e) {
                setPosition(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
            },
        })

        return position === null ? null : (
            <Marker position={position}>
                <Popup>You are here</Popup>
            </Marker>
        )
    }

    // Set up the default icon for markers
    const DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
    })

    L.Marker.prototype.options.icon = DefaultIcon

    return (
        <>
            <MapContainer
                center={{ lat: 52.237049, lng: 21.017532 }}
                zoom={13}
                style={{ height: '200px', width: '100%' }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker />
            </MapContainer>
        </>
    )
}

export default Map
