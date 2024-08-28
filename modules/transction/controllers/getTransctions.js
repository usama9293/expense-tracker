import Transaction from "../../../model/transaModel.js";

const getTransctions = async (req, res) => {
  try {
    // Fetch transactions based on user ID and optional filters from req.query
    const transactions = await Transaction.find({
      user_id: req.user.id, // Ensure user_id matches the user model
      ...req.query, 
    });

    // Check if transactions are found
    if (transactions.length === 0) {
      return res.status(404).json({
        message: "No transactions found",
        status: "failed",
      });
    }

    // Return the found transactions
    return res.status(200).json({
      message: "Transactions found",
      status: "success",
      data: transactions,
    });
  } catch (error) {
    // Handle any server errors
    return res.status(500).json({
      message: "Internal server error",
      status: "failed",
    });
  }
};

export default getTransctions;
