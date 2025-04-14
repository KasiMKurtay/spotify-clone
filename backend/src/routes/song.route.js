import { Router } from "express";

import {
  getAllSongs,
  getFeaturedSongs,
  getMadeForYou,
  getTrendingSongs,
} from "../controller/song.controller.js";

import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs); //Tüm şarkıları getiren GET endpoint

router.get("/featured", getFeaturedSongs); // Öne çıkan şarkıları getirir (giriş olunması gerekmez)

router.get("/made-for-you", getMadeForYou); //Kullanıcıya özel önerilen şarkıları getirir

router.get("/trending", getTrendingSongs); //Trend olan şarkıları getirir

export default router;
