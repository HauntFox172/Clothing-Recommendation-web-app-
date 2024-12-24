import axios from "axios";

const LOCATION_API_URL = "http://localhost:5076/api/Location/GetLocation";

const getLocationByCoordinates = async (latitude, longitude) => {
    try {
        const response = await axios.get(`${LOCATION_API_URL}`, {
            params: { latitude, longitude },
            timeout: 10000
        });
        const data = response.data;

        if(!data.results || !data.results[0])
        {
            throw new Error("Failed to get location data.");
        }

        const components = data.results[0].components;
        const city = components.city || components.town || components.village || "Unknown";
        const country = components.country || "Unknown";

        return { city, country };
    } catch (error) {
        console.error("Error requesting location: ", error.message);
        if(error.response) {
            console.error("Response from API:", error.response.data);
            console.error("Response code:", error.response.status);
        } else if (error.request) {
            console.error("Failed to get response from API.");
        }
        throw new Error("Unable to determine location.");
    }
};

export { getLocationByCoordinates };
