import expressAsyncErrors from "express-async-errors"; // Ensure this is correctly configured
import express from "express";
import errorHandler from "./handlers/error.js";
import connectDB from "./config/db.js";
import userRouter from "./modules/user/userRoute.js";

const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Define API routes
app.use("/api", userRouter);

// Error handling middleware (should be after all routes)
app.use(errorHandler);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
