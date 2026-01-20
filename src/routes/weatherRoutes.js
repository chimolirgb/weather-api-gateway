import express from "express";

const router = express.Router();

router.get("/current", (req, res) => {
  res.json({ message: "Current weather endpoint works" });
});

router.get("/forecast", (req, res) => {
  res.json({ message: "Forecast endpoint works" });
});

export default router; // ✅ this line is required for default export

