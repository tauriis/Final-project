import { Request as ExpressRequest, Response } from "express";
import Post from "../modules/posts";
import User from "../modules/users";
import mongoose from "mongoose";
import { IComment } from "../modules/posts";

interface UserPayload {
  _id: string;
  id: string;
  email: string;
  username: string;
}

interface Request extends ExpressRequest {
  user: UserPayload;
}

export const createComment = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { text } = req.body;

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const comment: Partial<IComment> = {
    text: text,
    username: user.username,
    userId: new mongoose.Types.ObjectId(req.user._id),
    likes: [],
    dislikes: [],
  };

  post.comments.push(comment as IComment);

  await post.save();

  return res.status(201).json({ message: "Comment created", comment });
};

export const getAllCommentsForPost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json(post.comments);
};

export const getCommentById = async (req: Request, res: Response) => {
  const { postId, commentId } = req.params;
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const comment = (post.comments as mongoose.Types.DocumentArray<IComment>).id(
    commentId
  );
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  res.json(comment);
};

export const deleteComment = async (req: Request, res: Response) => {
  const { postId, commentId } = req.params;

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const comment = (post.comments as mongoose.Types.DocumentArray<IComment>).id(
    commentId
  );
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  const userId = new mongoose.Types.ObjectId(req.user._id);
  if (!userId.equals(comment.userId) && !userId.equals(post.userId)) {
    return res
      .status(403)
      .json({ message: "You do not have permission to delete this comment" });
  }

  post.comments = post.comments.filter(
    (c: any) => c._id.toString() !== commentId
  );
  await post.save();

  res.json({ message: "Comment deleted" });
};

export const likeComment = async (req: Request, res: Response) => {
  const { postId, commentId } = req.params;

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const comment = (post.comments as mongoose.Types.DocumentArray<IComment>).id(
    commentId
  );
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  const userId = new mongoose.Types.ObjectId(req.user._id);
  const index = comment.likes.findIndex((id) => id.equals(userId));
  if (index > -1) {
    comment.likes.splice(index, 1);
  } else {
    comment.likes.push(userId);
    const dislikeIndex = comment.dislikes.findIndex((id) => id.equals(userId));
    if (dislikeIndex > -1) {
      comment.dislikes.splice(dislikeIndex, 1);
    }
  }

  await post.save();

  res.json(post);
};

export const dislikeComment = async (req: Request, res: Response) => {
  const { postId, commentId } = req.params;

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const comment = (post.comments as mongoose.Types.DocumentArray<IComment>).id(
    commentId
  );
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  const userId = new mongoose.Types.ObjectId(req.user._id);
  const index = comment.dislikes.findIndex((id) => id.equals(userId));
  if (index > -1) {
    comment.dislikes.splice(index, 1);
  } else {
    comment.dislikes.push(userId);
    const likeIndex = comment.likes.findIndex((id) => id.equals(userId));
    if (likeIndex > -1) {
      comment.likes.splice(likeIndex, 1);
    }
  }

  await post.save();

  res.json(post);
};
