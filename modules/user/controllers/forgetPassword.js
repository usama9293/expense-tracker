import User from "../../../model/userModel.js";
import nodemailer from "nodemailer";

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

    // Setup nodemailer transport
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "c562d498f053ef",
        pass: "93d62d05820e6b",
      },
    });

    // Send the reset code email
    const mailOptions = {
      to: email,
      from: "info@gmail.com",
      subject: "Password Reset Request",
      html: `<h1>Password Reset</h1><p>Your password reset code is: <strong>${resetCode}</strong></p>`,
      text: `Your password reset code is: ${resetCode}`,
    };

    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error sending email", status: "failed" });
      }

      return res
        .status(200)
        .json({ message: "Password reset email sent", status: "success" });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", status: "failed" });
  }
};

export default forgotPassword;
