namespace WeatherClothingApp.Services
{
    public class LocationService(HttpClient httpClient)
    {
        private readonly HttpClient _httpClient = httpClient;
        private readonly string _openCageApiKey = "36a2f0a4fdbe4f83be96797959bfa0f6";
        private readonly string _openCageBaseUrl = "https://api.opencagedata.com/geocode/v1/json";

        public async Task<LocationResponse?> GetLocationByCoordinatesAsync(double latitude, double longitude)
        {
            string requestUrl = $"{_openCageBaseUrl}?q={latitude}+{longitude}&key={_openCageApiKey}&pretty=1";
            
            try
            {    
                string response = await _httpClient.GetStringAsync(requestUrl);
                Console.WriteLine($"OpenCage API response: {response}");

                LocationResponse locationData = JsonConvert.DeserializeObject<LocationResponse>(response) ?? 
                    throw new HttpRequestException("Error: Data is empty.");

                Console.WriteLine($"Found {locationData.Results?.Count} results.");
                
                if (locationData.Results?.Count > 0)
                {
                    List<Models.Results> resultsList = [];
                    
                    foreach (Models.Results results in locationData.Results)
                    {
                        Console.WriteLine($"Result of the process: {results}");

                        Components Components = results.Components;

                        if (Components != null)
                        {
                            resultsList.Add(new Models.Results 
                            {
                                Components = new Components
                                {
                                    City = Components.City,
                                    Country = Components.Country,
                                    Town = Components.Town,
                                    Village = Components.Village
                                }
                            }); 
                        }                       
                    }

                    return new LocationResponse
                    {
                        Results = resultsList
                    }; 
                }
                else
                {
                    Console.WriteLine("No results found.");
                    return null;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Location determination error: {ex.Message}");
                return null;
            }
        }
    }
}