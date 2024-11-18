import jwt from "jsonwebtoken";

//In postman try checking for the token using POST
const verifyToken = (req, res, next) => {
  let token; //gets token from logging in user
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token, auth denied." });
    }
    //if its valid then the token we get needs to be decoded
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      console.log("The decoded user is:", req.user);
      next(); //forwards the request
    } catch (error) {
      res.status(400).json({ message: "Token is not valid." });
    }
  } else {
    return res.status(401).json({ message: "Authorization token not passed, access denied." });
  }
};

export default verifyToken;
