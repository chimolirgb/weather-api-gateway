// favoritesRoutes.js
import express from "express";
const router = express.Router();

// routes
router.get("/", (req, res) => res.send("Favorites route"));

// default export
export default router;
