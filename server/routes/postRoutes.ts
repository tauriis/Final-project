import { Router } from "express";
import { createPost } from "../controllers/postController";
import { authenticateToken } from "../middlewares/authenticateToken";

const router = Router();

router.post("/posts", authenticateToken, createPost);

export default router;