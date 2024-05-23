import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
} from "../controllers/postController";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = Router();

router.post("/posts", authenticateToken, createPost);
router.get("/posts", authenticateToken, getAllPosts);
router.get("/posts/:id", authenticateToken, getPostById);
router.delete("/posts/:id", authenticateToken, deletePost);

export default router;
