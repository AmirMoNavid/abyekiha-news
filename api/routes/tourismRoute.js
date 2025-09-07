import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  createTourism,
  deleteTourism,
  getCatTourism,
  getDetailTourism,
  getLastTourism,
  getNewTourism,
  getTourism,
  getTourismById,
  popularTourism,
  updateTourism,
  trackView,
} from "../controllers/TourismController.js";

const router = express.Router();

router.get("/tourism/newtourism", getNewTourism);
router.get("/tourism/lasttourism", getLastTourism);
router.get("/tourism/detail/:id", getDetailTourism);
router.get("/tourism/popular", popularTourism);
router.get("/tourism/cat-tourism", getCatTourism);
router.get("/tourism/trackView/:id", trackView);

router.get("/tourism", /*verifyToken,*/ getTourism);
router.post("/tourism", verifyToken, createTourism);
router.get("/tourism/:id", /*verifyToken,*/ getTourismById);
router.put("/tourism/:id", verifyToken, updateTourism);
router.delete("/tourism/:id", verifyToken, deleteTourism);

export default router;
