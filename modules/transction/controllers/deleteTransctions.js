import Transaction from "../../../model/transaModel.js";
import User from "../../../model/userModel.js";
import validator from "validator";

const deleteTransactions = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Transaction ID is required", status: "failed" });
  }

  if (!validator.isMongoId(id)) {
    return res
      .status(400)
      .json({ message: "Invalid Transaction ID", status: "failed" });
  }

  const getTransctions = await Transaction.findById({ _id: id });

  if (!getTransctions) {
    return res
      .status(400)
      .json({ message: "Transaction not found", status: "failed" });
  }

  if (getTransctions.transction_type === "income") {
    await User.findByIdAndUpdate(
      { _id: getTransctions.user_id },
      { $inc: { balance: -getTransctions.amount } }
    );
  } else {
    await User.findByIdAndUpdate(
      { _id: getTransctions.user_id },
      { $inc: { balance: getTransctions.amount } }
    );
  }

  try {
    await Transaction.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ message: "Transaction deleted successfully", status: "success" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", status: "failed" });
  }
};

export default deleteTransactions;
