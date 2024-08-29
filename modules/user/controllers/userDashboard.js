import User from "../../../model/userModel.js";
import Transaction from "../../../model/transaModel.js";

const userDashboard = async (req, res) => {
  const userId = req.user.id;

  try {
    // Find the user by ID and exclude the password field
    const user = await User.findById(userId).select("-password").exec();
    const transactions = await Transaction.find({ user_id: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .exec();

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "failed",
      });
    }

    return res.status(200).json({
      message: "User details",
      status: "success",
      data: user,
      transactions: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      message: "An error occurred while fetching user details",
      status: "failed",
    });
  }
};

export default userDashboard;
