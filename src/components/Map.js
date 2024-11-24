import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useMapEvents } from 'react-leaflet/hooks'

const Map = () => {
    const [position, setPosition] = useState(null)

    // const [initLat, setInitLat] = useState('')
    // const [initLng, setInitLng] = useState('')
    // const initLocalization = () => {
    //     // Check if geolocation is available
    //     if ('geolocation' in navigator) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 // On success, set the location (latitude and longitude)
    //                 const { latitude, longitude } = position.coords
    //                 console.log('init coords: ', {
    //                     lat: latitude,
    //                     lng: longitude,
    //                 })
    //                 setInitLat(latitude)
    //                 setInitLng(longitude)
    //             },
    //             (err) => {
    //                 console.error(err)
    //             }
    //         )
    //     } else {
    //         console.log('Geolocation is not supported by your browser.')
    //     }
    // }

    // useEffect(() => {
    //     initLocalization()
    // }, [])

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

    return (
        <>
            <MapContainer
                center={{ lat: 52.237049, lng: 21.017532 }}
                zoom={13}
                style={{ height: '400px', width: '100%' }}
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
