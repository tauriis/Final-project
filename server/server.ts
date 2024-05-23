import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "../server/db";
import { notFound, errorHandler } from "./middlewares/ErrorMiddleware";
import UserRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import cors from "cors";

const app: Application = express();

app.use(cors({ origin: "http://localhost:3000" }));

dotenv.config();

connectDB();

app.use(express.json());

console.log(process.env.MONGO_URI);

// Default
app.get("/", (req: Request, res: Response) => {
  res.status(201).json({ message: "Welcome" });
});

// User Route
app.use("/api", UserRoutes);

// Post Route
app.use("/api", postRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (): void => console.log(`Server is running on ${PORT}`));