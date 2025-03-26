import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controllers/blog.controllers.js";
import { verifyAdmin, verifyIdToken } from "../middleware/auth.middlewares.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/create", verifyIdToken, verifyAdmin, createBlog);
router.put("/update/:id", verifyIdToken, verifyAdmin, updateBlog);
router.delete("/delete/:id", verifyIdToken, verifyAdmin, deleteBlog);

export default router;
