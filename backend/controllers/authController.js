import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

//handles user regs, login, auth, add first_name last_name email

export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      first_name,
      last_name,
      email,
      username,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: `User registered successfully with username ${username}` });
  } catch (error) {
    //add more error handling here
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  try {
    //try to make it either username or email ang pang login
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with email ${email} cannot be found in the database.` });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: `Invalid credentials.` });
      }
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      response.status(200).json({ token });
    }
  } catch (error) {
    //add more error handling here
    console.error(error);
    res.status(error).json({ message: "Something went wrong" });
  }
};