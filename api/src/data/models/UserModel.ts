import { Document, model, Schema } from "mongoose";

export interface UserInt extends Document {
  username: string;
  password: string;
  avatar: string;
  crowdin: string;
  forum: string;
  github: string;
  news: string;
}

export const User = new Schema({
  username: String,
  password: String,
  avatar: String,
  crowdin: String,
  forum: String,
  github: String,
  news: String,
});

export default model<UserInt>("User", User);
