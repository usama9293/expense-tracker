import User from "./../../../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jwtManager from "./../../../managers/jwtManager.js";

import emailManager from "../../../managers/emailManager.js";
const register = async (req, res, next) => {
  const { username, email, password, confirmPassword, balance } = req.body;

  try {
    // Validate required fields
    if (!username || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "All fields are required", status: "failed" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Passwords do not match", status: "failed" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already in use", status: "failed" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const CreateUser = new User({
      username,
      email,
      password: hashedPassword, // Save the hashed password
      balance,
    });
    const accessToken = jwtManager(CreateUser);
    // Save the user to the database
    const savedUser = await CreateUser.save();

    emailManager(
      email,
      "Welcome to our platform",
      "<h1>Welcome to our platform</h1>",
      "Welcome to our platform, we are excited to have you on board"
    );

    // Respond with the created user
    res.status(201).json({
      message: "User registered successfully",
      user: savedUser,
      accessToken,
    });
  } catch (err) {
    // Pass the error to the error handler
    next(err);
  }
};

export default register;
