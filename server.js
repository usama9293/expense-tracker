import expressAsyncErrors from "express-async-errors";
import express from "express";
import errorHandler from "./handlers/error.js";
import connectDB from "./config/db.js";

const app = express();
connectDB();
app.use(express.json());

app.use(errorHandler);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
