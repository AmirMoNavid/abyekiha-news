import express from "express";
import { refreshToken } from "../controllers/RefreshToken.js";
import { Login, Logout, Profile, Register, getUser, deleteUser, getAllUsers, updateProfile, updateUser } from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();
router.get("/token", refreshToken)

router.get("/users", verifyToken, getAllUsers)
router.get("/users/:id", verifyToken, getUser)
router.get("/users/profile/:id", Profile)

router.post("/users", verifyToken, Register)
router.post("/users/login", Login)

router.put("/users/profile/:id", verifyToken, updateProfile)
router.put("/users/:id", verifyToken, updateUser)

router.delete("/users/:id", verifyToken, deleteUser)
router.delete("/users/logout", verifyToken, Logout)

export default router;