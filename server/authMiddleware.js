import dotenv from "dotenv";

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  const validToken = process.env.TOKEN;

  if (!token || token !== validToken) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  next();
};

export default authMiddleware;
