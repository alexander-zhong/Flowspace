import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth User/set Token
// POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.checkPassword(password))) {
    generateToken(res, user._id);
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register User
// POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  // Getting the variables from register use
  const { name, email, password, confirmpassword } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists with this email");
  } else if (password != confirmpassword) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  const user = await User.create({
    name: name,
    email: email,
    password: password,
    tasks: [],
  });

  if (user) {
    generateToken(res, user._id);
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      tasks: user.tasks,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Logout User
// POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

// @desc Get User's profile
// GET /api/users/profile
// @access Private (requiring JWT)
const getUser = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    tasks: req.user.tasks,
  };

  res.status(200).json(user);
});

// @desc Update User's profile
// PUT /api/users/profile
// @access Private (requiring JWT)
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.tasks = user.tasks;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    req.user = updatedUser;

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      tasks: updatedUser.tasks,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Add User's Tasks
// PUT /api/users/updatetasks
// @access Private (requiring JWT)
const updateTasks = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(user);

  if (user) {
    user.tasks = req.body.tasks || user.tasks;
    const updatedUser = await user.save();

    req.user = updatedUser;

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      tasks: updatedUser.tasks,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUser,
  updateUser,
  updateTasks,
};
