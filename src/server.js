import express from "express";
import dotenv from "dotenv";
import weatherRoutes from "./routes/weatherRoutes.js";
import favoritesRoutes from "./routes/favoritesRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/weather", weatherRoutes);
app.use("/api/favorites", favoritesRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
