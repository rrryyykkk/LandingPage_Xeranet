import express from "express";
import { getMe, login, logout, register } from "../controllers/auth.controllers.js";
import { verifyIdToken } from "../middleware/auth.middlewares.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyIdToken, getMe);
router.post("/logout", logout);

export default router;
