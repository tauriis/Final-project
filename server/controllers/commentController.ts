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
  
    const comment = new Comment({ text, username: user.username, post: postId, user: req.user._id });
    await comment.save();
  
    post.comments.push(comment);
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
    const { commentId } = req.params;
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json({ message: "Comment deleted" });
  };