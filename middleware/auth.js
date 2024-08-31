import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided.", status: "failed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Log decoded token

    req.user = {
      id: decoded.id,
      name: decoded.name,
    }; // Set req.user with only necessary data
   

    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res
      .status(401)
      .json({ message: "Invalid or expired token", status: "failed" });
  }
};

export default auth;
