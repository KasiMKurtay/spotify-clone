import { getAllUsers } from "../controller/user.controller.js"; 
import { protectRoute } from "../middleware/auth.middleware.js";

import { Router } from "express"; // Express'ten Router fonksiyonunu alır

const router = Router(); // Yeni bir router oluşturur

router.get("/", protectRoute, getAllUsers); // Giriş yapmış kullanıcılar tüm kullanıcıları görebilir

export default router; 
