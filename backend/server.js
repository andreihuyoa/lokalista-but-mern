import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config(); // lets u access the .env file
const app = express();

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", authRoutes);

//When building mern stack applicaiton, client/frontend should run on port 3000 by default pero with vite it run on 5173. Meanwhile "backend" server runs on 5000.

//Starts the server port 5000 is not working but 7002 does not sure why
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:5000`);
});
