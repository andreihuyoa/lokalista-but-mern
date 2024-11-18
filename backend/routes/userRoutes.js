import express from "express";

const router = express.Router();

//Client
router.get("/client", (req, res) => {
  res.send("Welcome Client");
});

//Freelancer
router.get("/freelancer", (req, res) => {
  res.send("Welcome Freelancer");
});

//Everyone
router.get("/user", (req, res) => {
  res.send("Welcome Everyone");
});
