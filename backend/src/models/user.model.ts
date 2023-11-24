import mongoose from "mongoose";
import { IUser } from "../declarations/user.t";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
});

// Define the User model
export default mongoose.model<IUser>("User", userSchema);
