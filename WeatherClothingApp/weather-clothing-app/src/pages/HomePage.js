import React, { useEffect, useState } from 'react';
import WeatherInfo from "../components/WeatherInfo";
import Header from "../components/Header";
import LoadingSpinner from "../components/LoadingSpinner";
import { getWeatherByCity } from "../services/weatherService";
import { getLocationByCoordinates } from "../services/locationService";
import ImageList from '../components/ImageList';

const HomePage = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [recommendation, setRecommendation] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [, setCity] = useState("");
    const [coordinates, setCoordinates] = useState(null);

    const fetchWeatherData = async (type, data) => {
        setLoading(true);
        setError(null);

        try {
            let city = "";
            let weatherResponse = null;

            if (type === "coordinates") {
                const locationResponse = await getLocationByCoordinates(data.latitude, data.longitude);

                if (!locationResponse || !locationResponse.city)
                    throw new Error("Unable to determine the city based on your coordinates.");

                city = locationResponse.city;
                console.log("City found: ", city);
            } else {
                city = data;
            }

            weatherResponse = await getWeatherByCity(city);

            if (!weatherResponse || !weatherResponse.temp || !weatherResponse.recommendation || !weatherResponse.description) {
                throw new Error("Failed to get current temperature.");
            }

            setWeatherData({
                city: city,
                temp: weatherResponse.temp.toFixed(0),
                description: weatherResponse.description || "No description",
            });
            
            setRecommendation(weatherResponse.recommendation || "There are no recommendations.");
        } catch (err) {
            console.error("Error retrieving weather information: ", err);
            setError("Error retrieving weather information.");
        }
        setLoading(false);
    };

    useEffect(() => {
        const handleUseMyCoordinates = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                            const { latitude, longitude } = position.coords;

                            if (!latitude || !longitude)
                            {
                                console.error("Failed to obtain geolocation coordinates.");
                                setError("Failed to obtain geolocation coordinates.");
                                return;
                            }

                            setCoordinates({ latitude, longitude });

                            getLocationByCoordinates(latitude, longitude)
                                .then(locationResponse => {
                                    if (!locationResponse || !locationResponse.city) {
                                        throw new Error("Failed to obtain geolocation coordinates.");
                                    }
                                    setCity(locationResponse.city);
                                    fetchWeatherData("coordinates", { latitude, longitude });
                                })
                                .catch(error => {
                                    console.error("Error getting location by coordinates: ", error);
                                    setError("Error getting location.");
                                });
                        }, 
                        (error) => {
                            console.error("Error getting geolocation:", error);
                            switch(error.code) {
                                case error.PERMISSION_DENIED:
                                    setError("Geolocation access denied.");
                                    break;
                                case error.POSITION_UNAVAILABLE:
                                    setError("Unknown position.");
                                    break;
                                case error.TIMEOUT:
                                    setError("Timeout exceeded.");
                                    break;
                                default:
                                    setError("Error getting geolocation.");
                                    break;
                            }
                        },
                        { 
                            timeout: 10000, // 10 секунд ожидания
                            enableHighAccuracy: true
                        } 
                    );
            } else {
                console.error("Geolocation API is not supported by your browser.");
                setError("Geolocation API is not supported by your browser.");
            }
        };

        handleUseMyCoordinates();
    }, []);

    return (
        <div>
            <Header onSubmit={fetchWeatherData} coordinates={coordinates} />
            {loading && <LoadingSpinner />}
            {error && <p className="error-and-loading-text">{error}</p>}
            {!loading && !error && (
                <>
                    <WeatherInfo weatherData={weatherData} recommendation={recommendation} />
                    <div className='background-div'>
                        <ImageList temperature={weatherData?.temp} />
                    </div>
                </>
            )}
        </div>
    );
};

export default HomePage;
