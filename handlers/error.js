const errorHandler = (err, req, res, next) => {
  if (err) {
    res.status(400).json({ message: err.message, status: "failed" });
  } else {
    next();
  }
};

export default errorHandler;
