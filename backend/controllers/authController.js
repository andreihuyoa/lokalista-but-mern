import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

//handles user regs, login, auth

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
    const { identifier, password } = req.body;
    //Find user by email or username
    const user = await User.findOne({
      //or is a mongodb command
      $or: [
        {
          email: identifier,
        },
        {
          username: identifier,
        },
      ],
    });
    if (!user) {
      return res.status(404).json({
        message: `No user found with email or username "${identifier}".`,
      });
    } else {
      //Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: `Wrong password.` });
      }

      //Generate jwt token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        //change this prolly longer
        expiresIn: "8h",
      });

      res.status(200).json({ message: "Login successful!", token, role: user.role });
    }
  } catch (error) {
    //add more error handling here like if a user already exists in database
    console.error(error);
    res.status(error).json({ message: "Server error. Try again later?" });
  }
};
