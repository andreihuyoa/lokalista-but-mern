import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import authorizedRoles from "../middlewares/roleMiddleware.js";
const router = express.Router();

//Client
router.get("/client", verifyToken, authorizedRoles("client"), (req, res) => {
  res.send("Welcome Client");
});

//Freelancer
router.get("/freelancer", verifyToken, authorizedRoles("freelance"), (req, res) => {
  res.send("Welcome Freelancer");
});

//Everyone
router.get("/user", (req, res) => {
  res.send("Welcome Everyone");
});

export default router;
