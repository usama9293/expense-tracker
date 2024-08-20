import jwt from "jsonwebtoken";

const jwtManager = (user) => {
  const accessToken = jwt.sign(
    {
      id: user._id,
      name: user.username, // Keeping only necessary information
    },
    process.env.JWT_SECRET
  );
  return accessToken;
};

export default jwtManager;