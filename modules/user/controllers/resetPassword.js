import User from "../../../model/userModel";

const resetPassword = async (req, res) => {
  const { email, new_password, reset_code } = req.body;

  if (!email) throw "email is required";
  if (!new_password) throw "new password  is required";
  if (!reset_code) throw "reset code is required";

  if (new_password.length < 5) throw "password must be length greater then 5";

  const getUser = await User.findOne({
    email: email,
    reset_code: reset_code,
  });
  if (!getUser) throw "reset code not found";
  const hashedPassword = await bcrypt.hash(new_password, 10);
  await User.updateOne(
    {
      email: email,
    },
    {
      password: hashedPassword,
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "sucess",
    message: "password reset sucessfully",
  });
};

export default resetPassword;
