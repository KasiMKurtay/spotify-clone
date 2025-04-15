import { Router } from "express";
import { authCallback } from "../controller/auth.controller.js";

const router = Router();

// POST isteği ile gelen callback isteklerini işle
router.post("/callback", authCallback); // "/auth/callback" yolunu dinler

export default router;
