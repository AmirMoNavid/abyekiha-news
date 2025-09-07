import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { uploadFile } from "../controllers/UploadFileController.js";

const router = express.Router();

router.post("/upload-file", verifyToken, uploadFile)

export default router;