import fetch from 'node-fetch';  // Use import instead of require

const API_KEY = process.env.API_KEY;

export async function handler(event) {
  const { lat, lon } = event.queryStringParameters;

  if (!lat || !lon) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Latitude and Longitude are required' }),
    };
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch weather data');
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
