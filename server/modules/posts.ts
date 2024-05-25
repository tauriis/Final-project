import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends mongoose.Document {
  text: string;
  username: string;
  userId: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  dislikes: mongoose.Types.ObjectId[];
}

interface IPost extends Document {
  title: string;
  content: string;
  userId: string;
  comments: IComment[];
  views: number;
  viewedBy: mongoose.Types.ObjectId[];
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{
    text: String,
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  }],
  views: { type: Number, default: 0 },
  viewedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, {
  timestamps: true,
});

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;