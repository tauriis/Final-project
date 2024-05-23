import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../modules/users";

interface UserPayload {
  id: string;
  email: string;
  username: string;
}

interface RequestWithUser extends Request {
  user: UserPayload;
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({ error: "JWT_SECRET is not defined" });
  }

  try {
    const decodedToken = jwt.verify(token, secret) as UserPayload;

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    (req as RequestWithUser).user = {
      id: String(user._id),
      email: user.email,
      username: user.username,
    };

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
