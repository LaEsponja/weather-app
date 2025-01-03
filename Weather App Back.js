// Select the weather button and weather display area
const weatherButton = document.getElementById('getWeather');
const weatherDiv = document.getElementById('weather');

// Function to fetch and display weather
async function fetchWeather(lat, lon) {
  const url = `/api/fetch-weather?lat=${lat}&lon=${lon}`; // Serverless function URL
  console.log(`API request URL: ${url}`);

  try {
    // Show a loading message
    weatherDiv.innerHTML = '<p>Loading weather data...</p>';

    const response = await fetch(url); // Call the serverless function

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    const data = await response.json();

    // Check if data is valid
    if (data && data.main) {
      const weatherCondition = data.weather[0].description; // Get weather condition description
      const iconCode = data.weather[0].icon; // Get the icon code

      // Update the HTML with weather info and the icon
      weatherDiv.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>
          Condition: ${weatherCondition} 
          <span class="icon-box">
            <img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="${weatherCondition}" />
          </span>
        </p>
      `;
    } else {
      weatherDiv.innerHTML = '<p>No weather data available for this location.</p>';
    }
  } catch (error) {
    weatherDiv.innerHTML = '<p>Failed to fetch weather data. Please try again.</p>';
    console.error('Error fetching weather:', error.message);
  }
}

// Function to get the user's location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetchWeather(latitude, longitude);
    }, error => {
      weatherDiv.innerHTML = '<p>Could not get location. Please enable location services.</p>';
    });
  } else {
    weatherDiv.innerHTML = '<p>Geolocation is not supported by your browser.</p>';
  }
}

// Add event listener to button
weatherButton.addEventListener('click', getLocation);