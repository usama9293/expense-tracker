import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    balance: {
      type: Number,
      default: 0,
      required: [true, "balance is required"],
    },
    // Remove the extra opening curly brace
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
