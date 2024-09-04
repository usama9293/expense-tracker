import auth from "../../middleware/auth.js";
import express from "express";
import addIncome from "./controllers/addIncome.js";
import addExpense from "./controllers/addExpense.js";
import Transactions from "./controllers/getTransctions.js";
import deleteTransctions from "./controllers/deleteTransctions.js";
const router = express.Router();

router.use(auth);

router.post("/addIncome", addIncome);
router.post("/addexpense", addExpense);
router.get("/transactions", Transactions);
router.delete("/delete/:id", deleteTransctions);

export default router;
