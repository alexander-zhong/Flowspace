import jwt from "jsonwebtoken";

// Generates a token for the user
const generateToken = (res, userId) => {
  // sign token with user id with timespan of 30 days
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // secure when out of development
    sameSite: "strict",
    maxAge: 2592000000, // 30 days
  });
};

export default generateToken;
