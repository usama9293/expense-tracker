import User from "../../../model/userModel.js";
import emailManager from "../../../managers/emailManager.js";

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ message: "Email is required", status: "failed" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", status: "failed" });
    }

    // Generate a random reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000);

    // Save the reset code to the user model
    user.reset_code = resetCode;
    await user.save();

    // Send the password reset email with the token
    const emailSent = await emailManager(
      email,
      "Password Reset Request",
      `<h1>Password Reset</h1><p>Your password reset code is: <strong>${resetCode}</strong></p>`,
      `Your password reset code is: ${resetCode}`
    );

    if (!emailSent) {
      return res
        .status(500)
        .json({ message: "Error sending email", status: "failed" });
    }

    return res
      .status(200)
      .json({ message: "Password reset email sent", status: "success" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", status: "failed" });
  }
};

export default forgotPassword;
