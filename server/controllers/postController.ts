import { Request, Response } from "express";
import Post from "../modules/posts";

interface UserPayload {
  id: string;
  email: string;
  username: string;
}

interface RequestWithUser extends Request {
  user: UserPayload;
}

export const createPost = async (req: Request, res: Response) => {
  const reqWithUser = req as RequestWithUser;
  const { title, content } = reqWithUser.body;
  const userId = reqWithUser.user.id;

  try {
    const post = new Post({
      title,
      content,
      userId,
    });

    const savedPost = await post.save();

    res.json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'No post found with this id' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};