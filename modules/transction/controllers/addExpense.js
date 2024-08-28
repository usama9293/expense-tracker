import Transction from "../../../model/transaModel.js";
import User from "../../../model/userModel.js";
import validator from "validator";

const addExpense = async (req, res, next) => {
  const { amount, remarks } = req.body;

  try {
    // Validate amount
    if (!amount) {
      return res
        .status(400)
        .json({ message: "Amount is required", status: "failed" });
    }

    // Convert and validate amount
    if (!validator.isNumeric(amount.toString()) || Number(amount) <= 0) {
      return res.status(400).json({
        message: "Amount should be a positive numeric value",
        status: "failed",
      });
    }

    // Validate remarks
    if (!remarks) {
      return res
        .status(400)
        .json({ message: "Remarks are required", status: "failed" });
    }

    if (remarks.length < 5) {
      return res.status(400).json({
        message: "Remarks should be at least 5 characters long",
        status: "failed",
      });
    }

    // Check if req.user is populated
    if (!req.user || !req.user.id) {
      return res
        .status(400)
        .json({ message: "User is not authenticated", status: "failed" });
    }

    // Find the user and update their balance
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", status: "failed" });
    }

    // Subtract the expense amount from the user's balance
    user.balance -= Number(amount);
    await user.save();

    // Create a new transaction
    const newExpense = new Transction({
      amount,
      remarks,
      transction_type: "expense",
      user_id: req.user.id,
    });

    // Save the transaction
    const savedExpense = await newExpense.save();

    // Respond with the saved expense
    return res.status(200).json({
      message: "Expense added successfully",
      status: "success",
      expense: savedExpense,
    });
  } catch (err) {
    next(err);
  }
};

export default addExpense;
