import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

//for registering user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  //Validate required fields

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message:
        "Please provide all required fields (username, email, password).",
    });
  }

  try {
    // Check if user already exists
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
      });

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Send success response
    res.status(200).json({
      success: true,
      message: "Registration Successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//for loggin user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist, please register",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password,
    );

    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Invalid password!",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.username,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" },
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.username,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//for logout
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  });
};

//for auth-middleware

const authMiddleWare = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });

  try {
    const decodedToken = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};

export { registerUser, loginUser, logoutUser, authMiddleWare };
