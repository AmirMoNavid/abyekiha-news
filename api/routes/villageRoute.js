import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  createVillage,
  deleteVillage,
  getCatVillage,
  getDetailVillage,
  getLastVillage,
  getNewVillage,
  getVillage,
  getVillageById,
  popularVillage,
  updateVillage,
  trackView,
} from "../controllers/VillageController.js";

const router = express.Router();

router.get("/village/newvillage", getNewVillage);
router.get("/village/lastvillage", getLastVillage);
router.get("/village/detail/:id", getDetailVillage);
router.get("/village/popular", popularVillage);
router.get("/village/cat-village", getCatVillage);
router.get("/village/trackView/:id", trackView);

router.get("/village", /*verifyToken,*/ getVillage);
router.post("/village", verifyToken, createVillage);
router.get("/village/:id", /*verifyToken,*/ getVillageById);
router.put("/village/:id", verifyToken, updateVillage);
router.delete("/village/:id", verifyToken, deleteVillage);

export default router;
