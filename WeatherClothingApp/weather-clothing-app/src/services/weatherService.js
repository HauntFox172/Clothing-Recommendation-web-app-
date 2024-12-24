import axios from "axios";

const WEATHER_API_URL = "http://localhost:5076/api/Weather/GetWeather";

const getWeatherByCity = async (city) => {
    try {
        console.log('Запрос к API с городом:', city);
        const response = await axios.get(`${WEATHER_API_URL}/${city}`);
        console.log(response.data);
        
        if (response.data && response.data.temp && response.data.description && response.data.recommendation) {
            return response.data;
        } else {
            throw new Error("Не удалось получить данные погоды для этого города.");
        }
    } catch (error) {
        console.error("Ошибка определения прогноза погоды для этого города: ", error);
        throw error;
    }
};

export { getWeatherByCity };
