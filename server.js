import expressAsyncErrors from "express-async-errors";
import express from "express";
import errorHandler from "./handlers/error.js";

const app = express();
app.use(express.json());

expressAsyncErrors();

app.use(errorHandler);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
