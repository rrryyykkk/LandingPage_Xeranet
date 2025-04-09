import express from "express";
import { getProfile, updateProfile } from "../controllers/user.controllers.js";
import { verifyIdToken } from "../middleware/auth.middlewares.js";

const router = express.Router();

// Ambil profil user yang sedang login
router.get("/profile", verifyIdToken, getProfile);

// Update profil user yang sedang login
router.put("/profile", verifyIdToken, updateProfile); // Bisa tambahkan verifyAdmin kalau hanya admin

export default router;
