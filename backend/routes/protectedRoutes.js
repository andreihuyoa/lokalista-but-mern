import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import authorizedRoles from "../middlewares/roleMiddleware.js";

const router = express.Router();

//Client Routes
router.get("/client/dashboard", verifyToken, authorizedRoles("client"), (req, res) => {
  res.json({ message: "Welcome to Client Dashboard", user: req.user });
});

//Freelancer Routes
router.get("/freelancer/dashboard", verifyToken, authorizedRoles("freelance"), (req, res) => {
  res.json({ message: "Welcome to Freelancer Dashboard", user: req.user });
});

//Public Routes(needs auth, no specific role)
router.get("/user-profile", (req, res) => {
  res.json({ message: "Welcome User", user: req.user });
});

export default router;
