import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useMapEvents } from 'react-leaflet/hooks'
import 'leaflet/dist/leaflet.css' // Leaflet CSS
import { setEventInfo } from '../redux/userSlice'
import { useDispatch } from 'react-redux'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const Map = () => {
    const [position, setPosition] = useState(null)
    const [address, setAddress] = useState(null)
    const dispatch = useDispatch()

    const getAddress = async (lat, lng) => {
        console.log('getAddress: ', lat, lng)
        if (!lat || !lng) return

        const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`

        try {
            const response = await fetch(apiUrl)
            const data = await response.json()
            console.log(data)

            // If a valid response is returned, set the address
            if (data && data.address) {
                const formattedAddress = `ul. ${data.address.road} ${
                    data.address.house_number ? data.address.house_number : ''
                }, ${data.address.town}, ${data.address.country}`
                setAddress(formattedAddress) // Set the address

                console.log('ADDRESS: ', formattedAddress)

                const eventObject = {
                    lat: position.lat,
                    lng: position.lng,
                    address: formattedAddress,
                }

                localStorage.setItem('eventInfo', JSON.stringify(eventObject))

                dispatch(setEventInfo(eventObject))
            } else {
                return null
            }
        } catch (error) {
            return null
        }
    }

    useEffect(() => {
        console.log(position)
        if (!position) return
        getAddress(position.lat, position.lng)
    }, [position])

    const LocationMarker = () => {
        const map = useMapEvents({
            click(e) {
                if (!position) {
                    map.locate()
                } else {
                    console.log(e.latlng)
                    setPosition(e.latlng)
                    map.flyTo(e.latlng, map.getZoom())

                    return
                }
            },
            locationfound(e) {
                setPosition(e.latlng)
                console.log(e.latlng)
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
                <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
            </MapContainer>
        </>
    )
}

export default Map
