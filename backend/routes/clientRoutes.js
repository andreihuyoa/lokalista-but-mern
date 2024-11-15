import express from "express";

const router = express.Router();

router.get("/dashboard", verifyToken, checkRole("client"), getClientDashboard);

module.exports = router;
