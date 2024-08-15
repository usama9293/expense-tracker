const errorHandler = (err, req, res, next) => {
  // Check if there's an error
  if (err) {
    // Check if the error has a status code and message
    const statusCode = err.statusCode || 500; // Default to 500 if no status code
    const message = err.message || "Internal Server Error";

    // Respond with the error message and status
    return res.status(statusCode).json({ message, status: "failed" });
  }

  // If there's no error, move on to the next middleware
  next();
};

export default errorHandler;
