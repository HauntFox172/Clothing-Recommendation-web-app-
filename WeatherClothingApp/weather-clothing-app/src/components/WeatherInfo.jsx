import React from "react";

const WeatherInfo = ({ weatherData, recommendation }) => {
    if (!weatherData) return null;

    return (
        <div className="main-page-content">
            <div className="weather-info">
                <h2>Information about city</h2>
                <p><strong>City: </strong> {weatherData.city}</p>
                <p><strong>Temperature: </strong> {weatherData.temp}°C</p>
                <p><strong>Weather: </strong> {weatherData.description}</p>
            </div>
            <div className="description">
                <h2>Recommended Clothing: </h2>
                <p>{recommendation}</p>
            </div>
        </div>
    );
};

export default WeatherInfo;
