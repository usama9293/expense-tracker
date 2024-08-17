import User from "../../../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Validate input fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", status: "failed" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", status: "failed" });
    }

    // Compare provided password with hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect password", status: "failed" });
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      {
        id: user._id,
        name: user.username, // Keeping only necessary information
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send response
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};

export default logIn;
