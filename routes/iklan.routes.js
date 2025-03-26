import express from "express";
import { verifyAdmin, verifyIdToken } from "../middleware/auth.middlewares.js";
import {
  createIklan,
  deleteIklan,
  getIklan,
  updateIklan,
} from "../controllers/iklan.controllers.js";

const router = express.Router();

router.get("/", getIklan);
router.post("/create", verifyIdToken, verifyAdmin, createIklan);
router.put("/update/:id", verifyIdToken, verifyAdmin, updateIklan);
router.delete("/delete/:id", verifyIdToken, verifyAdmin, deleteIklan);

export default router;
