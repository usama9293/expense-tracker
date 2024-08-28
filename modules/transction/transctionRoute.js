import auth from "../../middleware/auth.js";
import express from "express";
import addIncome from "./controllers/addIncome.js";
import addExpense from "./controllers/addExpense.js";
const router = express.Router();

router.use(auth);

router.post("/addIncome", addIncome);
router.post("/addexpense",addExpense);

export default router;
