const axios = require("axios");

const BASE_URL = "https://api.openweathermap.org/data/2.5";

async function getCurrentWeather(city) {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: process.env.OPENWEATHER_API_KEY,
      units: "metric"
    }
  });

  return response.data;
}

module.exports = { getCurrentWeather };
