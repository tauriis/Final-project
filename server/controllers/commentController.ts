import { Request as ExpressRequest, Response } from "express";
import Comment from "../modules/comments";
import Post from "../modules/posts";
import User from "../modules/users";

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

  const comment = new Comment({
    text: req.body.text,
    username: user.username,
    post: postId,
    user: req.user._id,
    likes: [],
    dislikes: [],
  });

  await comment.save();

  post.comments.push({
    text: comment.text,
    username: comment.username,
    userId: comment.user,
    likes: [],
    dislikes: [],
  });

  await post.save();

  res.json(post);
};

export const getAllCommentsForPost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const comments = await Comment.find({ post: postId });
  res.json(comments);
};

export const getCommentById = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);
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

  const commentIndex = post.comments.findIndex(
    (c: any) => c._id.toString() === commentId
  );
  if (commentIndex === -1) {
    return res.status(404).json({ message: "Comment not found" });
  }

  const comment = post.comments[commentIndex] as any;

  if (
    req.user._id.toString() !== comment.userId.toString() &&
    req.user._id.toString() !== post.userId.toString()
  ) {
    return res
      .status(403)
      .json({ message: "You do not have permission to delete this comment" });
  }

  post.comments.splice(commentIndex, 1);

  await post.save();

  res.json({ message: "Comment deleted" });
};

export const likeComment = async (req: Request, res: Response) => {
  const { postId, commentId } = req.params;

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const commentIndex = post.comments.findIndex(
    (c: any) => c._id.toString() === commentId
  );
  if (commentIndex === -1) {
    return res.status(404).json({ message: "Comment not found" });
  }

  const comment = post.comments[commentIndex] as any;


  if (comment.likes.includes(req.user._id)) {
    comment.likes = comment.likes.filter(
      (id: any) => id.toString() !== req.user._id.toString()
    );
  } else {

    comment.likes.push(req.user._id);

    if (comment.dislikes.includes(req.user._id)) {
      comment.dislikes = comment.dislikes.filter(
        (id: any) => id.toString() !== req.user._id.toString()
      );
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

  const commentIndex = post.comments.findIndex(
    (c: any) => c._id.toString() === commentId
  );
  if (commentIndex === -1) {
    return res.status(404).json({ message: "Comment not found" });
  }

  const comment = post.comments[commentIndex] as any;

  if (comment.dislikes.includes(req.user._id)) {

    comment.dislikes = comment.dislikes.filter(
      (id: any) => id.toString() !== req.user._id.toString()
    );
  } else {

    comment.dislikes.push(req.user._id);

    if (comment.likes.includes(req.user._id)) {
      comment.likes = comment.likes.filter(
        (id: any) => id.toString() !== req.user._id.toString()
      );
    }
  }

  await post.save();

  res.json(post);
};
