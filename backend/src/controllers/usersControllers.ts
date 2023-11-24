import {
  NextFunction,
  Request,
  Request as ExpressRequest,
  Response,
} from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface CustomRequest extends ExpressRequest {
  user?: any;
}

// Get all users
// GET /api/user/
// Private access
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  let allUsers;

  try {
    // find() returns 'Array'
    //in second argument we can specify which fields we want to get back. e.g we want to get back only 'email' and 'name'
    // or we can use "-". e.g: "User.find({}, "-password")" <= means, we wand all fields exclude password
    allUsers = await User.find({}, "-password");
  } catch (error) {
    res.status(500);
    throw new Error("Fetching users failed, please try again later");
  }

  res.json({
    // since find() returns Array, we need to use map() befor using toObject()
    allUsers: allUsers.map((user: any) => user.toObject({ getters: true })),
  });
};

// Register new user
// POST /api/user/
// Public access
const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    };

    res.status(201).json(userData);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

// Authenticate a user
// POST /api/users/login
// Public access
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
};

// Get user data
// GET /api/user/me
// Private access
const getMe = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { _id, name, email }: any = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
};

// Generate JWT
const generateToken = (id: any) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in your environment variables.");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default {
  getAllUsers,
  registerUser,
  loginUser,
  getMe,
};
