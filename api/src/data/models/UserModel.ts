import { Document, model, Schema } from "mongoose";
import encrypt from "mongoose-encryption";

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
if (process.env.ENCRYPTION_KEY && process.env.SIGNING_KEY) {
  const encryptionKey = process.env.ENCRYPTION_KEY;
  const signingKey = process.env.SIGNING_KEY;

  User.plugin(encrypt, {
    encryptionKey,
    signingKey,
    excludeFromEncryption: ["username"],
    requireAuthenticationCode: false,
  });
}
export default model<UserInt>("User", User);
