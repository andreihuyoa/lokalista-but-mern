import jwt from "jsonwebtoken";
import User from "../models/User.js";

/*
 * Handles Tokens (access, refresh), Login, Register, Logout
 */

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
    //add more error handling here like if a user already exists in database
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const generateTokens = (userId, role) => {
  //Access Token (short-lived)
  const accessToken = jwt.sign(
    { id: userId, role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" } //can be changed to lil longer
  );

  //Refresh Token (long-lived)
  const refreshToken = jwt.sign(
    { id: userId, role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" } //7 days nalang muna default
  );

  return { accessToken, refreshToken };
};
export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    //Find user by email or username
    const user = await User.findOne({
      //or is a mongodb command
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(404).json({
        message: `No user found with email or username "${identifier || "(Does not exist.)"}".`,
      });
    } else {
      //Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: `Wrong password.` });
      }

      const { accessToken, refreshToken } = generateTokens(user._id, user.role);

      //Set cookies
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 mins
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(200).json({
        message: "Login Successful",
        role: user.role,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(error).json({ message: "Server error. Try again later?" });
  }
};

export const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }

    //Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    //Generate new tokens
    const { accessToken, newRefreshToken } = generateTokens(user._id, user.role);

    //Set new cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error refreshing token" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};
