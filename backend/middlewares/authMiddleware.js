import jwt from "jsonwebtoken";

//In postman try checking for the token using POST
const verifyToken = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ message: "No access Token" });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      //if token expires, try to refresh
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Token expired",
          shouldRefresh: true,
        });
      }
      throw error;
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyToken;
