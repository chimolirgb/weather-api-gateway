import express from "express";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/favoritesController.js";

const router = express.Router();

router.post("/", addFavorite);
router.get("/", getFavorites);
router.delete("/:city", removeFavorite);

export default router;
