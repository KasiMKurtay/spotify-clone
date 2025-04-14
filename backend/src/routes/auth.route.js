import { Router } from "express";
import { authCallback } from "../controller/auth.controller.js";

const router = Router();

router.get("/calback", authCallback); //Giriş işlemi sonrası yönlendirilen callback

export default router;