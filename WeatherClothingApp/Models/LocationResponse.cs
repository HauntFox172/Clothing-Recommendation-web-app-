namespace WeatherClothingApp.Models
{
    public class LocationResponse
    {
        public List<Results> Results { get; set; } = [];
    }

    public class Results
    {
        public Components Components { get; set; } = new();
    }

    public class Components
    {
        public string Country { get; set; } = string.Empty;

        public string City { get; set; } = string.Empty;
        public string Town { get; set; } = string.Empty;
        public string Village { get; set; } = string.Empty;
    }
}