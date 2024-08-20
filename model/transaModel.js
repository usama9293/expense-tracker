import mongoose from "mongoose";

const transaSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transction_type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },
    remarks: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Transacton = mongoose.model("Transacton", transaSchema);

export default Transacton;
