import React, { useEffect, useState } from 'react'
import './Header.css'

const Header = () => {
    const [location, setLocation] = useState('Detecting location...')
    const [locError, setLocError] = useState(false)

    const fetchCity = (lat, lon) => {
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
            .then(res => res.json())
            .then(data => {
                if (data.address && (data.address.city || data.address.town || data.address.village)) {
                    setLocation(data.address.city || data.address.town || data.address.village)
                } else if (data.address && data.address.state) {
                    setLocation(data.address.state)
                } else {
                    setLocation('Location unavailable')
                    setLocError(true)
                }
            })
            .catch(() => {
                setLocation('Location unavailable')
                setLocError(true)
            })
    }

    const detectLocation = () => {
        setLocation('Detecting location...')
        setLocError(false)
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                pos => fetchCity(pos.coords.latitude, pos.coords.longitude),
                () => {
                    setLocation('Location unavailable')
                    setLocError(true)
                }
            )
        } else {
            setLocation('Location unavailable')
            setLocError(true)
        }
    }

    useEffect(() => {
        detectLocation()
    }, [])

    return (
        <header className='header'>
            <div className="header-gradient"></div>
            <div className="header-contents">
                <div className="header-location-row">
                    <span className="header-location-icon" role="img" aria-label="Location">📍</span>
                    <span className="header-location-text">
                        {location}
                        {locError && (
                            <button className="header-location-retry" onClick={detectLocation} aria-label="Retry location detection">
                                Retry
                            </button>
                        )}
                    </span>
                </div>
                <h2>Delicious food, delivered fast</h2>
                <p>
                    Explore our curated menu of fresh, flavorful dishes. Order now and enjoy a delightful meal at your doorstep—quick, easy, and always satisfying.
                </p>
                <button
                    className="header-btn"
                    onClick={() => document.getElementById('explore-menu')?.scrollIntoView({ behavior: 'smooth' })}
                    aria-label="View Menu"
                >
                    View Menu
                </button>
            </div>
        </header>
    )
}

export default Header
