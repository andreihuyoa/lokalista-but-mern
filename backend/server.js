import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

dotenv.config(); // lets u access the .env file
const app = express();

//Middleware
app.use(express.json());

//Routes

//When building mern stack applicaiton, client/frontend should run on port 3000 by default pero with vite it run on 5173. Meanwhile "backend" server runs on 5000.

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

//Starts the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:5000`);
});
