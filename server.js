import expressAsyncErrors from "express-async-errors"; // Ensure this is correctly configured
import express from "express";
import errorHandler from "./handlers/error.js";
import connectDB from "./config/db.js";
import userRouter from "./modules/user/userRoute.js";
import transactionRouter from "./modules/transction/transctionRoute.js";
import cors from "cors";
const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Define API routes
app.use("/api", userRouter);
app.use("/api", transactionRouter);

// Error handling middleware (should be after all routes)

app.all("*", (req, res, next) => {
  res.status(404).json({ message: "Route not found", status: "failed" });
});
app.use(errorHandler);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
