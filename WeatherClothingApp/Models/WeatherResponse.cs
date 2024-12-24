namespace WeatherClothingApp.Models
{
    public class WeatherResponse
    {
        public Main Main { get; set; } = new Main();
        public Weather[] Weather { get; set; } = [];
    }

    public class Main 
    {
        public double Temp { get; set; }
    }

    public class Weather
    {
        public string Description { get; set; } = string.Empty;
    }
}