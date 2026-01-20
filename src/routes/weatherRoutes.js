import express from "express";
import { fetchCurrentWeather, fetchForecast } from "../services/weatherService.js";

const router = express.Router();

// Specific route first
router.get("/forecast/:city", async (req, res) => {
  try {
    const data = await fetchForecast(req.params.city);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

//  Generic route second
router.get("/:city", async (req, res) => {
  try {
    const data = await fetchCurrentWeather(req.params.city);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

export default router;
