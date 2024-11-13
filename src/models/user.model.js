import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    photo: {
      type: String,
      require: false,
    },
    background: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
