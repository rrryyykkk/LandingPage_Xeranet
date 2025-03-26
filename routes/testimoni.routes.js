import express from "express";
import { verifyAdmin, verifyIdToken } from "../middleware/auth.middlewares.js";
import {
  createTestimoni,
  deleteTestimoni,
  getAllTestimoni,
  updateTestimoni,
} from "../controllers/testimoni.controllers.js";

const router = express.Router();

router.get("/", getAllTestimoni);
router.post("/create", createTestimoni);
router.put("/update/:id", updateTestimoni);
router.delete("/delete/:id", verifyIdToken, verifyAdmin, deleteTestimoni);

export default router;
