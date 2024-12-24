namespace WeatherClothingApp.Services
{
    public class WeatherService(HttpClient httpClient)
    {
        private readonly HttpClient _httpClient = httpClient;
        private readonly string _openWeatherApiKey = "391b763977dde18c7f81e3cb8b0b05b2";
        private readonly string _openWeatherBaseUrl = "http://api.openweathermap.org/data/2.5/weather";


        public async Task<WeatherResponse> GetWeatherByCityAsync(string city)
        {
            string url = $"{_openWeatherBaseUrl}?q={city}&appid={_openWeatherApiKey}&units=metric";

            string response = await _httpClient.GetStringAsync(url);

            WeatherResponse weatherData = JsonConvert.DeserializeObject<WeatherResponse>(response) ??  
                throw new HttpRequestException("Error: Data is empty.");

            return weatherData;
        }
    }
}