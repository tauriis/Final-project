import mongoose, { Document, Schema } from "mongoose";

interface IPost extends Document {
  title: string;
  content: string;
  userId: string;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;
