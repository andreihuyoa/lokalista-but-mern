import mongoose from "mongoose";
import User from "./User"; //extends

const freelancerSchema = new mongoose.Schema({
  skills: [String],
  portfolio: { type: String },
  star_rating: { type: String },
  availability: { type: Boolean, default: true },
});

const Freelancer = User.discriminator("Freelancer", freelancerSchema);

export default Freelancer;
