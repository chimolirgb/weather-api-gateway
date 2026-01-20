import { fetchCurrentWeather } from "../services/weatherService.js";

const favorites = []; // in-memory store

export const addFavorite = async (req, res) => {
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  if (favorites.length >= 3) {
    return res.status(400).json({ error: "You can only save up to 3 favorite cities" });
  }

  const exists = favorites.find(
    (c) => c.toLowerCase() === city.toLowerCase()
  );

  if (exists) {
    return res.status(400).json({ error: "City already in favorites" });
  }

  try {
    // Validate city by fetching weather
    await fetchCurrentWeather(city);

    favorites.push(city);
    res.status(201).json({ message: "City added to favorites", favorites });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const results = await Promise.all(
      favorites.map(async (city) => {
        const weather = await fetchCurrentWeather(city);
        return weather;
      })
    );

    res.json(results);
  } catch {
    res.status(500).json({ error: "Failed to fetch favorite cities weather" });
  }
};

export const removeFavorite = (req, res) => {
  const { city } = req.params;

  const index = favorites.findIndex(
    (c) => c.toLowerCase() === city.toLowerCase()
  );

  if (index === -1) {
    return res.status(404).json({ error: "City not found in favorites" });
  }

  favorites.splice(index, 1);
  res.json({ message: "City removed from favorites", favorites });
};
