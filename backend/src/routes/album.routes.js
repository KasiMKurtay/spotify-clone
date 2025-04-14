import { Router } from "express";
import { getAlbumById, getAllAlbums } from "../controller/album.controller.js";

const router = Router();

router.get("/", getAllAlbums); //Tüm albümleri getiren GET endpoint
router.get("/:albumId", getAlbumById); //Belirli bir albümü getiren GET endpoint

export default router;