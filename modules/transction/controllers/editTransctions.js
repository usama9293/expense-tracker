import Transaction from "../../../model/transaModel.js";
import validator from "validator";

const editTransactions = async (req, res) => {
  const { id } = req.params;

  // Validate transaction ID
  if (!validator.isMongoId(id)) {
    return res
      .status(400)
      .json({ message: "Invalid transaction id", status: "failed" });
  }

  const { amount, remarks, transction_type } = req.body;

  // Validate request body
  if (!amount || !remarks || !transction_type) {
    return res
      .status(400)
      .json({ message: "All fields are required", status: "failed" });
  }

  if (transction_type !== "income" && transction_type !== "expense") {
    return res
      .status(400)
      .json({ message: "Invalid transaction type", status: "failed" });
  }

  try {
    // Find and update transaction in one step
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: id },
      {
        amount,
        remarks,
        transction_type,
      },
      { new: true, runValidators: true }
    );

    // If the transaction is not found
    if (!updatedTransaction) {
      return res
        .status(404)
        .json({ message: "Transaction not found", status: "failed" });
    }

    return res.status(200).json({
      message: "Transaction updated successfully",
      status: "success",
      transaction: updatedTransaction, // Optionally return the updated transaction
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: "failed" });
  }
};

export default editTransactions;
