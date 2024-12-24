namespace WeatherClothingApp.Services
{
    public class ClothingRecommendationService
    {
        public ClothingRecommendation GetRecommendation(double? temperature, string weatherDescription)
        {
            if (temperature == null)
            {
                throw new ArgumentNullException(nameof(temperature),"Temperature value cannot be missing.");
            }
            else if (string.IsNullOrEmpty(weatherDescription))
            {
                throw new ArgumentNullException(nameof(weatherDescription),"Weather description cannot be missing.");
            }
            
            double notNullTemperature = temperature.Value;

            if (weatherDescription.Contains("rain") || weatherDescription.Contains("dirzzle"))
            {
                return new ClothingRecommendation { Recommendation = "Take an umbrella and wear a coat or other waterproof clothing." };
            }
            else if (weatherDescription.Contains("snow"))
            {
                return new ClothingRecommendation { Recommendation = "Wear a winter jacket, gloves and boots. Don't forget to take a hat and scarf!" };
            }
            else if (notNullTemperature > 25)
            {
                return new ClothingRecommendation { Recommendation = "Wear light summer clothes and sunglasses, and don't forget to bring sunscreen." };
            }
            else if (notNullTemperature > 15 && notNullTemperature <= 25)
            {
                return new ClothingRecommendation { Recommendation = "A light jacket or sweater will be enough." };
            }
            else if (notNullTemperature > 5 && notNullTemperature <= 15)
            {
                return new ClothingRecommendation { Recommendation = "Wear a warm jacket or coat. A scarf wouldn't hurt either." };
            }
            else if (notNullTemperature <= 5)
            {
                return new ClothingRecommendation { Recommendation = "Put on a winter jacket, gloves and a hat. It's quite cold outside." };
            }
            else
            {
                return new ClothingRecommendation { Recommendation = "Unable to set weather conditions." };
            }
        } 
    }
}