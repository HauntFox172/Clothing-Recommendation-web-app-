import React, { useEffect, useState } from 'react';

const WeatherForm = ({ onSubmit, coordinates }) => {
    const [city, setCity] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    useEffect(() => {
        if (coordinates) {
            setCity(coordinates.city || "");
            setLatitude(coordinates.latitude || "");
            setLongitude(coordinates.longitude || "");
        } else {
            setCity("");
            setLatitude("");
            setLongitude("");
        }
    }, [coordinates]);

    const handleCityChange = (e) => setCity(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city) {
            onSubmit("city", city);
        } else if (latitude && longitude) {
            onSubmit("coordinates", { latitude, longitude });
        } else {
            alert("Please, enter another city or coordinates.");
        }
    };

    const getLocationFromGPS = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                setLatitude(lat);
                setLongitude(lon);
                onSubmit("coordinates", { latitude: lat, longitude: lon });
            },
            () => alert("Couldn't get your coordinates.")
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='input-form'>
                <label>City: </label>
                <input 
                    type="text" 
                    value={city} 
                    onChange={handleCityChange} 
                    placeholder="Input city"
                />
            </div>
            <div className='buttons'>
                <button type="button" onClick={getLocationFromGPS}>
                    Use my coordinates (GPS)
                </button>
                <button type="submit">Get recommendation</button>
            </div>
        </form>
    );
};

export default WeatherForm;
