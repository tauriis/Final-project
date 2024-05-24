import mongoose, { Document, Schema } from "mongoose";

interface IComment {
  text: string;
  username: string;
  userId: mongoose.Types.ObjectId;
}

interface IPost extends Document {
  title: string;
  content: string;
  userId: string;
  comments: IComment[];
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{ text: String, username: String, userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }], // Modify this line
}, {
  timestamps: true,
});

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;