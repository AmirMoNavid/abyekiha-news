import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  createVideo,
  deleteVideo,
  getAllVideo,
  getSingleVideo,
} from "../controllers/VideoController.js";

const router = express.Router();

router.post("/video", verifyToken, createVideo);
router.get("/video", getAllVideo);
router.get("/singleVideo", getSingleVideo);
router.delete("/video/:id", verifyToken, deleteVideo);

export default router;
