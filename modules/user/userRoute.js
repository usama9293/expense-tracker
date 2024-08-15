import register from "./controllers/register.js";
import logIn from "./controllers/login.js";
import express from "express";
const router = express.Router();

router.post("/register", register);
router.post("/login", logIn);

export default router;
