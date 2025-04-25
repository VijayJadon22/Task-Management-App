import express from "express";
import { handleLogin, handleLogout, handleSignup,getUserProfile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);
router.get("/getProfile",authMiddleware, getUserProfile);


export default router;