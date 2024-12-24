namespace WeatherClothingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherController(WeatherService weatherService, ClothingRecommendationService clothingService) : ControllerBase
    {
        private readonly WeatherService _weatherService = weatherService;
        private readonly ClothingRecommendationService _clothingService = clothingService;

        [HttpGet("GetWeather/{city}")]
        public async Task<IActionResult> GetWeather(string city)
        {
            if (string.IsNullOrEmpty(city))
            {
                return BadRequest("You must enter a city name.");
            }
            else
            {
                try
                {
                    WeatherResponse weather = await _weatherService.GetWeatherByCityAsync(city);

                    ClothingRecommendation clothingRecommendation = _clothingService.GetRecommendation(weather.Main.Temp, weather.Weather[0].Description);

                    return Ok( new {
                        weather.Main.Temp,
                        weather.Weather[0].Description,
                        clothingRecommendation.Recommendation
                        }
                    );
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"The city was not recognized: {ex.Message}");
                }
            }
    
        }
    }
}