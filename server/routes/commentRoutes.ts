import { Router } from "express";
import {
  createComment,
  getAllCommentsForPost,
  getCommentById,
  deleteComment,
} from "../controllers/commentController";
import { authenticateToken } from "../middlewares/authenticateToken";

interface UserPayload {
  _id: string;
  email: string;
  username: string;
}

interface Request extends Express.Request {
  user: UserPayload;
}

const router = Router();

router.post("/posts/:postId/comments", authenticateToken, createComment as any);
router.get(
  "/posts/:postId/comments",
  authenticateToken,
  getAllCommentsForPost as any
);
router.get(
  "/posts/:postId/comments/:commentId",
  authenticateToken,
  getCommentById as any
);
router.delete(
  "/posts/:postId/comments/:commentId",
  authenticateToken,
  deleteComment as any
);

export default router;
