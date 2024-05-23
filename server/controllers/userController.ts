import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../modules/users";
import generateToken from "../utils/generateToken";
import { Document } from "mongoose";

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({}).select("-password");
  res.status(201).json({ success: true, count: users.length, users });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (await user.comparePassword(password)) {
    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, email: user.email, username: user.username },
    });
  } else {
    res.status(401);
    throw new Error("Email or password incorrect");
  }
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  const user = new User({
    email,
    username,
    password,
  });

  await user.save(); // Save the user to the database

  const token = generateToken(user.id); // Generate a JWT token for the user

  res.status(201).json({
    success: true,
    token,
    user: { id: user._id, email: user.email, username: user.username },
  });
});
