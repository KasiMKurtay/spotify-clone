import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("User route with get");
});

router.post("/", (req, res) => {
  res.send("User route with get");
});


router.delete("/", (req, res) => {
  res.send("User route with get");
});


router.get("/", (req, res) => {
  res.send("User route with get");
});


export default router