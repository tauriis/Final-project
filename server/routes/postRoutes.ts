import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
} from "../controllers/postController";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = Router();

router.post("/posts/", authenticateToken, createPost as any);
router.get("/posts/", getAllPosts as any);
router.get("/posts/:id", authenticateToken, getPostById as any);
router.delete("/posts/:id", authenticateToken, deletePost as any);

export default router;
