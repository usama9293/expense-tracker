import register from "./controllers/register.js";
import logIn from "./controllers/login.js";
import userDashboard from "./controllers/userDashboard.js";
import auth from "../../middleware/auth.js";
import forgotPassword from "./controllers/forgetPassword.js";
import resetPassword from "./controllers/resetPassword.js";
import express from "express";
const router = express.Router();

router.post("/register", register);
router.post("/login", logIn);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

router.use(auth);
router.get("/dashboard", userDashboard);

export default router;
