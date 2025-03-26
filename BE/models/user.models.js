import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String },
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",  
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;