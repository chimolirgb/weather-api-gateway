const { getCurrentWeather } = require("../services/weatherService");

exports.getWeather = async (req, res) => {
  try {
    const city = req.params.city;
    const data = await getCurrentWeather(city);

    res.json({
      city: data.name,
      country: data.sys.country,
      current: {
        temperature: data.main.temp,
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed
      },
      cached: false,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(404).json({ error: "City not found" });
  }
};
