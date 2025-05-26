# API-integration
*COMPANY*: CODETECH IT SOLUTIONS

*NAME*: N.LAKSHMI POOJITHA 

*INTERN ID*: CT06DM1191

*DOMAIN*: FULL STACK WEB DEVELOPMENT

*DURATION*: 6 weeks

*MENTOR*:  NEELA SANTOSH

*DESCRIPTION*:

The provided code creates a Simple Weather Application that runs entirely in a web browser (client-side). It demonstrates how to fetch and display data from a public API, specifically using the Open-Meteo API for weather information. The application consists of three main files: index.html (for structure), style.css (for styling), and script.js (for functionality).

index.html - The Structure of the Webpage
The index.html file sets up the basic layout of the weather application. It's a standard HTML5 document with a head section for metadata and a body section for the visible content.

<!DOCTYPE html> and <html lang="en">: These declarations define the document type as HTML5 and specify the primary language of the document as English, which is good for accessibility.
<head>: This section contains meta-information about the HTML document, not directly displayed on the page.
<meta charset="UTF-8">: Specifies the character encoding for the document as UTF-8, supporting a wide range of characters.
<meta name="viewport" content="width=device-width, initial-scale=1.0">: This crucial meta tag ensures that the webpage is responsive and renders correctly across various devices (desktops, tablets, mobile phones) by setting the viewport width to the device's width and the initial zoom level to 1.0.
<title>Weather App</title>: Sets the title that appears in the browser tab or window.
<link rel="stylesheet" href="style.css">: Links the HTML document to the external stylesheet (style.css), which dictates the visual presentation of the page.
<body>: This section contains all the visible content of the webpage.
<div class="container">: A main container div that wraps all the application elements. This is typically used for centering content and applying general styling.
<h1>Simple Weather App</h1>: A prominent heading for the application.
<div class="search-box">: A div to group the input field and the button together.
<input type="text" id="city-input" placeholder="Enter city name">: An input field where the user can type the name of the city for which they want to get weather information. The id="city-input" makes it easy for JavaScript to reference this element, and placeholder provides a hint to the user.
<button id="fetch-weather-btn">Get Weather</button>: A button that, when clicked, triggers the JavaScript function to fetch weather data. The id="fetch-weather-btn" allows JavaScript to attach an event listener to it.
<div id="weather-display" class="weather-display">: This div is initially empty. It's where the fetched weather data (temperature, conditions, etc.) will be dynamically inserted by JavaScript.
<div id="error-message" class="error-message">: This div is also initially empty. It's used to display any error messages to the user, such as "city not found" or "API error."
<script src="script.js"></script>: This line links the HTML document to the external JavaScript file (script.js). It's placed at the end of the <body> to ensure that the HTML elements are fully loaded before the JavaScript attempts to interact with them.
style.css - The Aesthetics of the Webpage
The style.css file provides basic styling to make the weather application visually appealing and user-friendly.

body: Styles the entire body of the page.
font-family: Sets a common font.
display: flex, justify-content: center, align-items: center, min-height: 100vh: These properties use Flexbox to center the content vertically and horizontally on the page. min-height: 100vh ensures the body takes at least the full height of the viewport.
background-color and margin: Sets a light grey background and removes default body margins.
.container: Styles the main container div.
background-color, padding, border-radius, box-shadow: Gives it a white background, internal spacing, rounded corners, and a subtle shadow for a card-like effect.
text-align: center: Centers the text within the container.
width and max-width: Makes the container responsive, taking 90% of the width up to a maximum of 500px.
h1: Styles the main heading with a dark grey color and bottom margin.
.search-box: Styles the div containing the input and button.
display: flex, justify-content: center, gap: Uses Flexbox to arrange the input and button side-by-side with some spacing.
#city-input: Styles the text input field.
padding, border, border-radius, font-size, flex-grow: Provides spacing, a light border, rounded corners, a legible font size, and allows it to grow to fill available space.
#fetch-weather-btn: Styles the "Get Weather" button.
padding, background-color, color, border, border-radius, font-size, cursor, transition: Sets padding, a blue background, white text, no border, rounded corners, a good font size, a pointer cursor on hover, and a smooth transition for hover effects.
&:hover: Changes the background color on hover, providing visual feedback.
.weather-display: Styles the div where weather information is shown.
margin-top, padding, border, border-radius, background-color, text-align, min-height: Adds top margin, internal padding, a light border, rounded corners, a slightly different background, left-aligned text, and a minimum height to prevent layout shifts when content appears.
.weather-display p and .weather-display p strong: Styles the paragraphs and strong text within the weather display for better readability.
.error-message: Styles the error message div with red text and bold font to make errors stand out.
script.js - The Brains of the Application
The script.js file contains the core logic for fetching and displaying data using JavaScript.

document.addEventListener('DOMContentLoaded', () => { ... });: This is a crucial line. It ensures that the JavaScript code only runs after the entire HTML document has been fully loaded and parsed. This prevents errors that could occur if the script tries to access HTML elements that don't exist yet.
Element References:
const cityInput = document.getElementById('city-input');: Gets a reference to the city input field.
const fetchWeatherBtn = document.getElementById('fetch-weather-btn');: Gets a reference to the "Get Weather" button.
const weatherDisplay = document.getElementById('weather-display');: Gets a reference to the div where weather data will be shown.
const errorMessage = document.getElementById('error-message');: Gets a reference to the div for error messages.
Event Listener:
WorkspaceWeatherBtn.addEventListener('click', fetchWeather);: Attaches an event listener to the "Get Weather" button. When the button is clicked, the WorkspaceWeather asynchronous function is executed.
async function fetchWeather(): This is the main function that handles the weather data fetching. The async keyword indicates that this function will perform asynchronous operations (like network requests) and will use await.
Input Validation: const cityName = cityInput.value.trim(); if (!cityName) { ... }: It first gets the value from the city input, removes leading/trailing whitespace (.trim()), and checks if it's empty. If so, it displays an error and stops execution.
Clear Previous Display: weatherDisplay.innerHTML = ''; errorMessage.textContent = '';: Before making a new request, it clears any previously displayed weather data or error messages.
try...catch Block: This block is used for error handling. Code inside try is executed, and if any error occurs, the catch block is executed, preventing the entire script from crashing.
Step 1: Geocoding API Call:
const geocodingApiUrl =https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&amp;count=1&amp;language=en&amp;format=json;: Constructs the URL for the Open-Meteo Geocoding API. encodeURIComponent is used to safely encode the city name for use in a URL. This API translates a city name into its latitude and longitude.
const geoResponse = await fetch(geocodingApiUrl);: Makes an asynchronous network request to the geocoding API. await pauses the function execution until the response is received.
const geoData = await geoResponse.json();: Parses the received response body as JSON.
Error Checking for Geocoding: if (!geoResponse.ok || !geoData.results || geoData.results.length === 0) { ... }: Checks if the geocoding API request was successful (geoResponse.ok) and if any results were found (geoData.results exists and is not empty). If not, it displays an appropriate error.
const { latitude, longitude, name, country } = geoData.results[0];: Destructures the first result from the geocoding data to extract latitude, longitude, and the confirmed city name and country.
Step 2: Weather API Call:
const weatherApiUrl =[https://api.open-meteo.com/v1/forecast?latitude=](https://www.google.com/search?q=https://api.open−meteo.com/v1/forecast{longitude}&amp;current_weather=true&amp;temperature_unit=celsius&amp;wind_speed_unit=kmh&amp;precipitation_unit=mm;: Constructs the URL for the main Open-Meteo Weather API using the obtained latitude and longitude. It requests current_weather, temperature in Celsius, wind speed in km/h, and precipitation in mm.
const weatherResponse = await fetch(weatherApiUrl);: Makes the asynchronous network request to the weather API.
const weatherData = await weatherResponse.json();: Parses the weather response as JSON.
Error Checking for Weather Data: if (!weatherResponse.ok || !weatherData.current_weather) { ... }: Checks if the weather API request was successful and if current_weather data is available. If not, it displays an error.
displayWeather(weatherData.current_weather, name, country);: Calls the displayWeather function to render the fetched data.
catch (error): If any unhandled error occurs during the try block (e.g., network issues, malformed JSON), this block catches it, logs it to the console, and displays a generic error message to the user.
function displayWeather(currentWeather, cityName, country): This function takes the current weather object, city name, and country as arguments and updates the weather-display div.
const { temperature, windspeed, weathercode, winddirection } = currentWeather;: Destructures relevant properties from the currentWeather object.
Weather Code Mapping: const weatherDescriptions = { ... };: An object that maps numerical weathercode values from Open-Meteo to human-readable descriptions (e.g., 0 for 'Clear sky', 3 for 'Overcast'). This makes the output much more understandable.
const weatherDescription = weatherDescriptions[weathercode] || 'Unknown';: Retrieves the description for the given weathercode, defaulting to 'Unknown' if the code is not found.
Dynamic HTML Update: weatherDisplay.innerHTML =...;: Uses template literals (backticks `) to create an HTML string with the fetched data and injects it into the weather-display div. This dynamically updates the content of the webpage.
function displayError(message): This simple utility function is responsible for showing error messages to the user.
errorMessage.textContent = message;: Sets the text content of the error-message div.
weatherDisplay.innerHTML = '';: Clears the weather display so that only the error message is visible.
In summary, this web application provides a clear example of how to interact with external APIs from a browser. It demonstrates key web development concepts including HTML structure, CSS styling, asynchronous JavaScript (async/await, Workspace), JSON data parsing, and dynamic content manipulation (DOM manipulation). The use of Open-Meteo, which doesn't require an API key, makes it an excellent starting point for learning API interactions.
