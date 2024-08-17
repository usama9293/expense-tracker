const auth = async (req, res, next) => {
  console.log(req.headers);
  next();
};

export default auth;
