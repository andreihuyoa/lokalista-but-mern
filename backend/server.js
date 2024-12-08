import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";

dotenv.config(); //lets u access the .env file

const app = express();
const PORT = process.env.PORT || 5000;

//Cors Config
const corsOptions = {
  origin: ["http://localhost:5173", "https://lokalista-frontend-domain.com"], //frontend origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions)); //use this for advanced setup or just use app.use(cors());

//Middleware
app.use(express.json());

//Public Routes
app.use("/api/auth", authRoutes);

//Protected Routes
app.use("/api", protectedRoutes);

//When building mern stack applicaiton, client/frontend should run on port 3000 by default pero with vite it run on 5173. Meanwhile "backend" server runs on 5000.

//Starts the server port 5000 is not working but 7002 does, it means that another app is using it

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error.message);
    process.exit(1);
  }
};

startServer();
