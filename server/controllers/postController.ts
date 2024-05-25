import { Request as ExpressRequest, Response } from "express";
import Post from "../modules/posts";
import mongoose from "mongoose";

interface UserPayload {
  _id: string;
  id: string;
  email: string;
  username: string;
}

interface Request extends ExpressRequest {
  user: UserPayload;
}

export const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user._id;

  try {
    const post = new Post({
      title,
      content,
      userId,
    });

    const savedPost = await post.save();

    res.json(savedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while creating the post", error });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate("userId", "username");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "userId",
      "username"
    );
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this post" });
    }

    await Post.deleteOne({ _id: id });

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const incrementViewCount = async (req: Request, res: Response) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, viewedBy: { $ne: userId } },
      { $addToSet: { viewedBy: userId }, $inc: { views: 1 } },
      { new: true }
    );
    if (!post) {
      return res.status(404).send("Post not found");
    }
    // Send the view count
    res.send({ viewCount: post.views });
  } catch (err) {
    res.status(500).send(err);
  }
};
