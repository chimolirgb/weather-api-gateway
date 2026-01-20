import { fetchCurrentWeather, fetchForecast } from "../services/weatherService.js";

export const getCurrentWeather = async (req, res) => {
  const city = req.params.city;
  try {
    const data = await fetchCurrentWeather(city);
    res.json(data);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

export const getForecast = async (req, res) => {
  const city = req.params.city;
  try {
    const data = await fetchForecast(city);
    res.json(data);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};
