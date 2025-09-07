import express from "express";
import { active, createComment, deleteComment, getAllComments, getComment, deActivate, updateComment } from "../controllers/CommentController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/comment/:id", getComment)
router.get("/comment", getAllComments)

router.post("/comment", createComment)

router.put("/comment/:id/:isactive", verifyToken, active)
router.put("/comment/:id", verifyToken, updateComment)

router.delete("/comment/:id", verifyToken, deleteComment)

export default router;