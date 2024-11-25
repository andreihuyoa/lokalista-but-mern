import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, unique: true }, //makes this not actually required but optional and can be added sa settings
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["client", "freelance"], required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
