import mongoose, { Document } from "mongoose";

export interface UserSchemaInterface extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  img: string;
  _doc: { password: string; [key: string]: any };
}

const UserSchema = new mongoose.Schema<UserSchemaInterface>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: { type: String },
    _doc: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
