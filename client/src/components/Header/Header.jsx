import React, { useEffect, useState } from 'react'
import './Header.css'

const Header = ({ setLocation }) => {
    const [displayLocation, setDisplayLocation] = useState('Detecting location...')
    const [locError, setLocError] = useState(false)

    const fetchCity = (lat, lon) => {
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
            .then(res => res.json())
            .then(data => {
                if (data.address) {
                    const place =
                        data.address.city ||
                        data.address.town ||
                        data.address.village ||
                        data.address.hamlet ||
                        data.address.municipality ||
                        data.address.county ||
                        data.address.suburb ||
                        data.address.state_district ||
                        '';
                    const state = data.address.state || '';
                    let loc = '';
                    if (place && state && place !== state) {
                        loc = `${place}, ${state}`;
                    } else if (place) {
                        loc = place;
                    } else if (state) {
                        loc = state;
                    } else {
                        loc = 'Location unavailable';
                        setLocError(true);
                    }
                    setDisplayLocation(loc);
                    setLocation && setLocation(loc);
                } else {
                    setDisplayLocation('Location unavailable');
                    setLocError(true);
                    setLocation && setLocation('Location unavailable');
                }
            })
            .catch(() => {
                setDisplayLocation('Location unavailable');
                setLocError(true);
                setLocation && setLocation('Location unavailable');
            })
    }

    const detectLocation = () => {
        setDisplayLocation('Detecting location...')
        setLocError(false)
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                pos => fetchCity(pos.coords.latitude, pos.coords.longitude),
                () => {
                    setDisplayLocation('Location unavailable')
                    setLocError(true)
                    setLocation && setLocation('Location unavailable')
                }
            )
        } else {
            setDisplayLocation('Location unavailable')
            setLocError(true)
            setLocation && setLocation('Location unavailable')
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
                        {displayLocation}
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
                    onClick={() => document.getElementById('food-display')?.scrollIntoView({ behavior: 'smooth' })}
                    aria-label="View Menu"
                >
                    View Menu
                </button>
            </div>
        </header>
    )
}

export default Header
