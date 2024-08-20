import auth from "../../middleware/auth.js";
import express from "express";
import addIncome from "./controllers/addIncome.js";
const router = express.Router();

router.use(auth);

router.post("/addIncome", addIncome);

export default router;
