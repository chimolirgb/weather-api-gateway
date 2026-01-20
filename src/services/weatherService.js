import https from "https";

import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import NodeCache from "node-cache";

console.log("🔎 ENV CHECK");
console.log("BASE_URL =", process.env.OPENWEATHER_BASE_URL);
console.log("API_KEY =", process.env.OPENWEATHER_API_KEY);

const cache = new NodeCache({ stdTTL: 600 });

const BASE_URL = process.env.OPENWEATHER_BASE_URL;
const API_KEY = process.env.OPENWEATHER_API_KEY;

console.log("BASE_URL:", BASE_URL);
console.log("API_KEY exists:", !!API_KEY);
const httpsAgent = new https.Agent({
  family: 4, // 👈 force IPv4
  keepAlive: true,
});

export const fetchCurrentWeather = async (city) => {
  const cacheKey = `weather-${city.toLowerCase()}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  try {
    const response = await axios.get(
  "https://api.openweathermap.org/data/2.5/weather",
  {
    params: {
      q: city,
      appid: process.env.OPENWEATHER_API_KEY,
      units: "metric",
    },
    timeout: 10000,
    httpsAgent,
  }
);

    const data = {
      city: response.data.name,
      temperature: response.data.main.temp,
      weather: response.data.weather[0].main,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
    };

    cache.set(cacheKey, data);
    console.log(`✅ Weather fetched for ${city}`);
    return data;
  } catch (error) {
    console.error("❌ Weather error:", error.response?.data || error.message);
    throw { status: 500, message: "Failed to fetch weather data" };
  }
};

export const fetchForecast = async (city) => {
  const cacheKey = `forecast-${city.toLowerCase()}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  try {
   const response = await axios.get(
  "https://api.openweathermap.org/data/2.5/forecast",
  {
    params: {
      q: city,
      appid: process.env.OPENWEATHER_API_KEY,
      units: "metric",
    },
    timeout: 10000,
    httpsAgent,
  }
);


    const dailyForecast = {};
    response.data.list.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      dailyForecast[date] ??= {
        min: item.main.temp_min,
        max: item.main.temp_max,
      };
      dailyForecast[date].min = Math.min(
        dailyForecast[date].min,
        item.main.temp_min,
      );
      dailyForecast[date].max = Math.max(
        dailyForecast[date].max,
        item.main.temp_max,
      );
    });

    const forecastArray = Object.entries(dailyForecast)
      .slice(0, 5)
      .map(([date, temps]) => ({ date, ...temps }));

    cache.set(cacheKey, forecastArray);
    console.log(`✅ Forecast fetched for ${city}`);
    return forecastArray;
  } catch (error) {
    console.error("❌ Forecast error:", error.response?.data || error.message);
    throw { status: 500, message: "Failed to fetch forecast data" };
  }
};
