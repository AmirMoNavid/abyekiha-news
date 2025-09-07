import express from "express";
import {
  createArticle,
  deleteArticle,
  getCatArticle,
  getArticleByCatId,
  getLatestArticles,
  getArticle,
  getArticleById,
  updateArticle,
  getShahrdariArticle,
  trackView,
} from "../controllers/ArticleController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/article/latest", getLatestArticles);
router.get("/article/shahrdari", getShahrdariArticle);
router.get("/article/cat", getCatArticle);
router.get("/article", getArticle);
router.get("/article/catId/:catId", getArticleByCatId);
router.get("/article/:id", getArticleById);
router.get("/article/trackView/:id", trackView);

router.post("/article", verifyToken, createArticle);

router.put("/article/:id", verifyToken, updateArticle);
router.delete("/article/:id", verifyToken, deleteArticle);

export default router;
