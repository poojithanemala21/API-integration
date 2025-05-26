document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const fetchWeatherBtn = document.getElementById('fetch-weather-btn');
    const weatherDisplay = document.getElementById('weather-display');
    const errorMessage = document.getElementById('error-message');

    fetchWeatherBtn.addEventListener('click', fetchWeather);

    async function fetchWeather() {
        const cityName = cityInput.value.trim();
        if (!cityName) {
            displayError('Please enter a city name.');
            return;
        }

        // Clear previous display and errors
        weatherDisplay.innerHTML = '';
        errorMessage.textContent = '';

        try {
            // Step 1: Get Latitude and Longitude for the city using Open-Meteo Geocoding API
            const geocodingApiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
            const geoResponse = await fetch(geocodingApiUrl);
            const geoData = await geoResponse.json();

            if (!geoResponse.ok || !geoData.results || geoData.results.length === 0) {
                displayError(`Could not find coordinates for "${cityName}". Please try another city.`);
                return;
            }

            const { latitude, longitude, name, country } = geoData.results[0];

            // Step 2: Fetch weather data using the obtained coordinates
            const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm`;
            const weatherResponse = await fetch(weatherApiUrl);
            const weatherData = await weatherResponse.json();

            if (!weatherResponse.ok || !weatherData.current_weather) {
                displayError('Could not fetch weather data. Please try again later.');
                console.error('Weather API error:', weatherData);
                return;
            }

            displayWeather(weatherData.current_weather, name, country);

        } catch (error) {
            console.error('Error fetching weather:', error);
            displayError('An unexpected error occurred. Please try again.');
        }
    }

    function displayWeather(currentWeather, cityName, country) {
        const { temperature, windspeed, weathercode, winddirection } = currentWeather;

        // Map Open-Meteo weather codes to descriptions
        const weatherDescriptions = {
            0: 'Clear sky',
            1: 'Mostly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Fog',
            48: 'Depositing rime fog',
            51: 'Drizzle: Light',
            53: 'Drizzle: Moderate',
            55: 'Drizzle: Dense intensity',
            56: 'Freezing Drizzle: Light',
            57: 'Freezing Drizzle: Dense intensity',
            61: 'Rain: Slight',
            63: 'Rain: Moderate',
            65: 'Rain: Heavy intensity',
            66: 'Freezing Rain: Light',
            67: 'Freezing Rain: Heavy intensity',
            71: 'Snow fall: Slight',
            73: 'Snow fall: Moderate',
            75: 'Snow fall: Heavy intensity',
            77: 'Snow grains',
            80: 'Rain showers: Slight',
            81: 'Rain showers: Moderate',
            82: 'Rain showers: Violent',
            85: 'Snow showers: Slight',
            86: 'Snow showers: Heavy',
            95: 'Thunderstorm: Slight or moderate',
            96: 'Thunderstorm with slight hail',
            99: 'Thunderstorm with heavy hail'
        };

        const weatherDescription = weatherDescriptions[weathercode] || 'Unknown';

        weatherDisplay.innerHTML = `
            <h2>Weather in ${cityName}, ${country}</h2>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Conditions:</strong> ${weatherDescription}</p>
            <p><strong>Wind Speed:</strong> ${windspeed} km/h</p>
            <p><strong>Wind Direction:</strong> ${winddirection}°</p>
        `;
    }

    function displayError(message) {
        errorMessage.textContent = message;
        weatherDisplay.innerHTML = ''; // Clear any previous weather display
    }
});
