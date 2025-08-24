# Weather Now

A simple and clean weather application that provides real-time weather information for any city in the world.

## Features

- **Current Weather:** Get the current temperature, weather conditions, and a visual icon.
- **7-Day Forecast:** See the weather forecast for the next seven days.
- **Detailed Information:** Access detailed information such as:
    - Air Quality Index (AQI)
    - Sunrise and Sunset times
    - Humidity
    - Pressure
    - Visibility
    - Wind Speed
    - "Feels Like" temperature
- **Hourly Forecast:** View the weather forecast for the next few hours.
- **Search by City:** Manually enter a city name to get weather updates.
- **Current Location:** Use your device's GPS to get weather information for your current location.
- **Dark Mode:** Toggle between light and dark themes for comfortable viewing.

## Technologies Used

- HTML
- CSS
- JavaScript
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Moment.js](https://momentjs.com/)
- [Font Awesome](https://fontawesome.com/)
- [Boxicons](https://boxicons.com/)

## How to Use

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/weather-app.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd weather-app
    ```
3.  **Open `index.html` in your browser.**

## API Key

This project uses the OpenWeatherMap API to fetch weather data. You will need to get your own API key from [OpenWeatherMap](https://openweathermap.org/appid) and replace the placeholder in the `js/script.js` file:

```javascript
// OpenWeatherMap API key
let api_key = "YOUR_API_KEY";
```

## Credits

This project was created by [Luis P. Shinyala](https://github.com/ALLBLACKHIM).
