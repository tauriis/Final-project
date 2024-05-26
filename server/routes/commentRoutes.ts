import { Router } from "express";
import {
  createComment,
  getAllCommentsForPost,
  getCommentById,
  deleteComment,
  likeComment,
  dislikeComment,
} from "../controllers/commentController";
import { authenticateToken } from "../middlewares/authenticateToken";

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

router.post(
  "/posts/:postId/comments/:commentId/like",
  authenticateToken,
  likeComment as any
);
router.post(
  "/posts/:postId/comments/:commentId/dislike",
  authenticateToken,
  dislikeComment as any
);

export default router;