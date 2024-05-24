import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../modules/users";

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      _id: string;
      id: string;
      email: string;
      username: string;
    };
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, async (err: any, user: any) => {
    if (err) return res.sendStatus(403);

    const fullUser = await User.findById(user.id);
    if (!fullUser) return res.sendStatus(404);

    req.user = {
      _id: String(fullUser._id),
      id: String(fullUser._id),
      email: fullUser.email,
      username: fullUser.username,
    };

    next();
  });
};