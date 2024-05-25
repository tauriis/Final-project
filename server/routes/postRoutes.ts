import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  incrementViewCount,
} from "../controllers/postController";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = Router();

router.post("/posts/", authenticateToken, createPost as any);
router.get("/posts/", getAllPosts as any);
router.get("/posts/:id", authenticateToken, getPostById as any);
router.delete("/posts/:id", authenticateToken, deletePost as any);
router.put("/posts/:id/views", authenticateToken, incrementViewCount as any);

export default router;