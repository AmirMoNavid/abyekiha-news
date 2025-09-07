import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  createAdvertising,
  deleteAdvertising,
  getAdvertising,
  getAdvertisingById,
  getCatAdvertising,
  getDetailAdvertising,
  getLastAdvertising,
  popularAdvertising,
  updateAdvertising,
} from "../controllers/AdvertisingControler.js";

const router = express.Router();

router.get("/advertising/lastadvertising", getLastAdvertising);
router.get("/advertising/detail/:id", getDetailAdvertising);
router.get("/advertising/popular", popularAdvertising);
router.get("/advertising/cat-advertising", getCatAdvertising);

router.get("/advertising", /*verifyToken,*/ getAdvertising);
router.get("/advertising/:id", verifyToken, getAdvertisingById);
router.post("/advertising", verifyToken, createAdvertising);
router.put("/advertising/:id", verifyToken, updateAdvertising);
router.delete("/advertising/:id", verifyToken, deleteAdvertising);

export default router;
