import { Router } from "express";
import {
  checkAdmin,
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} from "../controller/admin.controller.js";

import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router(); //Yeni bir router nesnesi oluşturur

router.use(protectRoute, requireAdmin); //Tüm alt route'larda önce kullanıcı oturumu ve admin yetkisi kontrol edilir

router.get("/check", checkAdmin); //GET isteğiyle admin olmadığını kontrol

router.post("/songs", createSong); //Yeni bir şarkı oluşturmak için POST endpoint
router.delete("/songs/:id", deleteSong); //Belirli bir şarkıyı silmek için DELETE endpoint

router.post("/albums", createAlbum); //Yeni bir albüm oluşturmak için POST endpoint

router.delete("/albums", deleteAlbum); //Belirli bir albümü silmek için DELETE endpoint

export default router;
