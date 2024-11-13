import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

dotenv.config(); // lets u access the .env file

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

console.log(process.env.MONGO_URI);

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
