import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends mongoose.Document {
  text: string;
  username: string;
  userId: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  dislikes: mongoose.Types.ObjectId[];
  createdAt: Date;
}

interface IPost extends Document {
  title: string;
  content: string;
  userId: string;
  comments: IComment[];
  views: number;
  viewedBy: mongoose.Types.ObjectId[];
  likes: mongoose.Types.ObjectId[];
  dislikes: mongoose.Types.ObjectId[];
  tags: string[];
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [
      {
        text: String,
        username: String,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        createdAt: { type: Date, default: Date.now },
      },
    ],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    views: { type: Number, default: 0 },
    viewedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;
