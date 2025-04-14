import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { getStats } from "../controller/stat.controller.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getStats); //Tüm istatistikleri getirir, sadece giriş yapmış Adminlere gösterir

export default router;
