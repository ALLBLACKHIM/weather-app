// Get city input
let cityInput = $("#city-input"),
  // Get search button
  searchButton = $("#search-button"),
  // Get location button
  locationButton = $("#location-button"),
  // Get loader element
  loader = $(".loading"),
  // Get theme switch
  themeSwitch = $("#theme-switch"),
  // OpenWeatherMap API key
  api_key = "Your_API_Key",
  // Get current weather card
  currentWeatherCard = $(".weather-left .card").eq(0),
  // Get 7-day forecast card
  sevenDaysForecastCard = $(".day-forecast"),
  // Get air quality index card
  aqiCard = $(".highlights .card").eq(0),
  sunriseCard = $(".highlights .card").eq(1),
  // Other weather details cards
  humidityCard = $("#humidityValue"),
  pressureCard = $("#pressureValue"),
  visibilityCard = $("#visibilityValue"),
  windSpeedCard = $("#windSpeedValue"),
  feelsLikeCard = $("#feelsLikeValue"),
  // Hourly forecast cards
  hourlyForecastCards = $(".hourly-forecast"),
  // Air quality index list
  aqiList = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];

// Get weather details
function getWeatherDetails(name, lat, lon, country, state) {
  // Get 7-day forecast
  let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
    // Get current weather
    WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
    // Get air quality index
    AQI_API_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`,
    // Get 7-day forecast
    days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    // Get months
    months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

  // Show loader
  loader.addClass("active");

  // Fetch data from all APIs simultaneously
  $.when(
    $.ajax({ url: AQI_API_URL, method: "GET" }),
    $.ajax({ url: WEATHER_API_URL, method: "GET" }),
    $.ajax({ url: FORECAST_API_URL, method: "GET" })
  )
    .done(function (aqiData, weatherData, forecastData) {
      // Hide loader
      loader.removeClass("active");

      // Update air quality index
      let { co, no, no2, o3, so2, pm2_5, pm10, nh3 } =
        aqiData[0].list[0].components;
      aqiCard.html(`
      <div class="card-head">
        <p>Air Quality Index</p>
        <p class="air-index aqi-${aqiData[0].list[0].main.aqi}">${
        aqiList[aqiData[0].list[0].main.aqi - 1]
      }</p>
      </div>
      <div class="air-indices">
        <i><img src="/Weather icons/Light bg/Air.svg" alt=""></i>
        <div class="item">
          <p>PM2.5</p>
            <h2>${pm2_5}</h2>
          </div>
          <div class="item">
            <p>PM2.10</p>
            <h2>${pm10}</h2>
          </div>
          <div class="item">
            <p>SO2</p>
            <h2>${so2}</h2>
          </div>
          <div class="item">
            <p>CO</p>
            <h2>${co}</h2>
          </div>
          <div class="item">
            <p>NO</p>
            <h2>${no}</h2>
          </div>
          <div class="item">
            <p>NO2</p>
            <h2>${no2}</h2>
          </div>
          <div class="item">
            <p>NH3</p>
            <h2>${nh3}</h2>
          </div>
          <div class="item">
            <p>O3</p>
            <h2>${o3}</h2>
          </div>
        </div>
      </div>`);

      // Update current weather
      let date = new Date();
      currentWeatherCard.html(`
        <div class="current-weather">
          <div class="details">
            <p>Now</p>
            <h2>${(weatherData[0].main.temp - 273.15).toFixed(2)}&deg;C</h2>
            <p>${weatherData[0].weather[0].description}</p>
          </div>
          <div class="weather-icon">
            <img src="https://openweathermap.org/img/wn/${
              weatherData[0].weather[0].icon
            }@2x.png" alt="">
          </div>
        </div>
        <hr>
        <div class="card-footer">
          <p><i class="fa-solid fa-calendar"></i>${
            days[date.getDay()]
          }, ${date.getDate()}, ${
        months[date.getMonth()]
      } ${date.getFullYear()}</p>
          <p><i class="fa-solid fa-location-dot"></i>${name}, ${country}</p>
        </div>
    `);

      // Update sunrise and sunset
      let { sunrise, sunset } = weatherData[0].sys,
        { timezone } = weatherData[0],
        riseTime = moment
          .utc(sunrise, "X")
          .add(timezone, "seconds")
          .format("hh:mm A"),
        setTime = moment
          .utc(sunset, "X")
          .add(timezone, "seconds")
          .format("hh:mm A");
      sunriseCard.html(`
      <div class="card-head">
        <p>Sunrise & Sunset</p>
      </div>
      <div class="sunrise-sunset">
        <div class="item">
          <div class="icon">
            <i><img src="/Weather icons/Light bg/Sunrise.svg" alt=""></i>
          </div>
          <div>
            <p>Sunrise</p>
            <h2>${riseTime}</h2>
          </div>
        </div>
        <div class="item">
          <div class="icon">
            <i><img src="/Weather icons/Light bg/Sunset.svg" alt=""></i>
          </div>
          <div>
            <p>Sunset</p>
            <h2>${setTime}</h2>
          </div>
        </div>
      </div>
      `);

      // Update other weather details
      humidityCard.html(`${weatherData[0].main.humidity}%`);
      pressureCard.html(`${weatherData[0].main.pressure} hPa`);
      visibilityCard.html(`${(weatherData[0].visibility / 1000).toFixed(
        2
      )} km`);
      windSpeedCard.html(`${(weatherData[0].wind.speed * 3.6).toFixed(
        2
      )} km/h`);
      feelsLikeCard.html(`${(
        weatherData[0].main.feels_like - 273.15
      ).toFixed(2)}°C`);

      // Update hourly forecast
      let hourlyForecast = forecastData[0].list;
      hourlyForecastCards.html("");
      hourlyForecast.slice(0, 6).forEach((forecast) => {
        let date = new Date(forecast.dt_txt);
        let hours = date.getHours();
        let period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Convert to 12-hour format
        hourlyForecastCards.append(`
          <div class="card">
            <p>${hours} ${period}</p>
            <i><img src="https://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png" alt=""></i>
            <h2>${(forecast.main.temp - 273.15).toFixed(2)}&deg;C</h2>
          </div>
        `);
      });

      // Update daily forecast
      let uniqueForecastDays = [];
      let sevenDaysForecast = forecastData[0].list.filter((forecast) => {
        let forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          return uniqueForecastDays.push(forecastDate);
        }
      });
      sevenDaysForecastCard.html("");
      sevenDaysForecast.forEach((forecast) => {
        let date = new Date(forecast.dt_txt);
        sevenDaysForecastCard.append(`
          <div class="forecast-item">
            <div class="icon-wrapper">
              <img src="https://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png" alt="">
              <span>${(forecast.main.temp - 273.15).toFixed(2)}&deg;C</span>
            </div>
            <p>${date.getDate()} ${months[date.getMonth()]}</p>
            <p>${days[date.getDay()]}</p>
          </div>
        `);
      });
    })
    .fail(() => {
      // Hide loader on error
      loader.removeClass("active");
      alert("Failed to fetch weather details");
    });
}

// Get city coordinates
function getCityCoordinates() {
  let cityName = cityInput.val().trim();
  cityInput.val("");
  if (!cityName) {
    return;
  }
  let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
  // Show loader
  loader.addClass("active");
  $.ajax({
    url: GEOCODING_API_URL,
    method: "GET",
    success: function (data) {
      let { name, lat, lon, country, state } = data[0];
      getWeatherDetails(name, lat, lon, country, state);
    },
    error: function () {
      // Hide loader on error
      loader.removeClass("active");
      alert(`failed to fetch coordinates for ${cityName}`);
    },
  });
}

// Get user coordinates
function getUserCoordinates() {
  // Show loader
  loader.addClass("active");
  if (navigator.geolocation) {
    // Get current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let { latitude, longitude } = position.coords;
        let REVERSE_GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${api_key}`;

        // Fetch location details
        $.ajax({
          url: REVERSE_GEOCODING_API_URL,
          method: "GET",
          success: function (data) {
            let { name, lat, lon, country, state } = data[0];
            getWeatherDetails(name, lat, lon, country, state);
          },
          error: function () {
            // Hide loader on error
            loader.removeClass("active");
            alert("Failed to fetch your location");
          },
        });
      },
      (error) => {
        // Hide loader on error
        loader.removeClass("active");
        if (error.code === error.PERMISSION_DENIED) {
          alert(
            "Geolocation permission denied. Please allow access to your location."
          );
        } else {
          alert("Geolocation error. Please try again.");
        }
      }
    );
  } else {
    // Hide loader on error
    loader.removeClass("active");
    alert("Geolocation is not supported by this browser.");
  }
}

// Apply theme from local storage
function applyTheme(theme) {
    if (theme === "dark") {
        $("body").addClass("dark-mode");
        themeSwitch.prop("checked", true);
    } else {
        $("body").removeClass("dark-mode");
        themeSwitch.prop("checked", false);
    }
}

// Event listener for theme switch
themeSwitch.on("change", (e) => {
    const theme = e.target.checked ? "dark" : "light";
    localStorage.setItem("theme", theme);
    applyTheme(theme);
});

// Check local storage for theme on page load
$(window).on("load", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);
    getUserCoordinates();
});

// Get city coordinates
searchButton.on("click", getCityCoordinates);

// Get user coordinates
locationButton.on("click", getUserCoordinates);

// Get city coordinates with enter key
cityInput.on("keypress", (e) => {
  if (e.key === "Enter") {
    getCityCoordinates();
  }
});