import User from "../../../model/userModel.js";
import bcrypt from "bcryptjs";

const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", status: "failed" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", status: "failed" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", status: "failed" });
    }
    res.status(200).json({ message: "User logged in successfully", user });
  } catch (err) {
    next(err);
  }
};

export default logIn;
