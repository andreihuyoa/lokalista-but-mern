import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
const router = express.Router();

//Client
router.get("/client", verifyToken, (req, res) => {
  res.send("Welcome Client");
});

//Freelancer
router.get("/freelancer", verifyToken, (req, res) => {
  res.send("Welcome Freelancer");
});

//Everyone
router.get("/user", (req, res) => {
  res.send("Welcome Everyone");
});

export default router;
