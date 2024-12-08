import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import authorizedRoles from "../middlewares/roleMiddleware.js";

const router = express.Router();

//Client Routes
router.get("/client/dashboard", verifyToken, authorizedRoles("client"), async (req, res) => {
  //most of these are for testing, use postman or whatever
  try {
    res.json({
      success: true,
      data: {
        message: "Client Dashboard!",
        user: req.user,
        projects: [], // add clients project data?
        teams: [], // add clients teams
        notifications: [], // add notifications
        stats: {
          activeProjects: 0,
          // completedProjects: 0,
          //add more stats
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting client dashboard data",
    });
  }
});

//Freelancer Routes
router.get("/freelancer/dashboard", verifyToken, authorizedRoles("freelance"), async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        message: "Freelancer Dashboard!",
        user: req.user,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting freelancer dashboard data",
    });
  }
});

//Public Routes(needs auth, no specific role)
router.get("/user-profile", async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        message: "User Profile!",
        user: req.user,
        stats: {
          pendingTasks: [],
          inProgressTasks: [],
          completedTasks: [], // this should be permanent and have history
          earnings: 0,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting user profile data",
    });
  }
});

export default router;
