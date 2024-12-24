namespace WeatherClothingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController(LocationService locationService) : ControllerBase
    {
       private readonly LocationService _locationService = locationService;

       [HttpGet("GetLocation")]
       public async Task<IActionResult> GetLocation(double latitude, double longitude)
       {
            if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180)
            {
                return BadRequest("Incorrect coordinates. Latitude must be between -90 and 90, and longitude between -180 and 180.");
            }

            try
            {
                LocationResponse location = await _locationService.GetLocationByCoordinatesAsync(latitude, longitude) ?? 
                    throw new Exception("Error: Unable to find geolocation.");  

                return Ok(location);  
            }  
            catch (Exception ex)
            {
                return StatusCode(500, $"Error getting coordinates: {ex.Message}");
            } 
       }
    }
}