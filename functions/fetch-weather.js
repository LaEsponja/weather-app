const axios = require('axios');

exports.handler = async (event) => {
  const { lat, lon } = event.queryStringParameters;
  const API_KEY = process.env.API_KEY;

  if (!lat || !lon) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Latitude and longitude are required.' }),
    };
  }

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat,
        lon,
        units: 'metric',
        appid: API_KEY,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch weather data.' }),
    };
  }
};
