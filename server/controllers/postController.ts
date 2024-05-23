import { Request, Response, NextFunction } from "express";
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