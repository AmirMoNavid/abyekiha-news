import express from "express";
import { createSlideShow, deleteSlideShow, getAllSlideShow, getSlideShow } from "../controllers/SlideShowControler.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.post("/slideshow", verifyToken, createSlideShow)
router.get("/slideshow", getAllSlideShow)
router.delete("/slideshow/:id", verifyToken, deleteSlideShow)

export default router;