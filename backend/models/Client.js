import mongoose from "mongoose";
import User from "../models/User.js"; //extends

//just for reference, update to something else pa
const clientSchema = new mongoose.Schema({
  companyName: { type: String },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
});

const Client = User.discriminator("Client", clientSchema);

export default Client;
