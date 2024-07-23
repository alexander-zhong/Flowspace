import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import connectToDB from "./config/dbSetup.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";

// Config the express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config();

// Cors policy
app.use(
  cors({
    origin: process.env.FRONTEND,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Home
app.get("/", (req, res) => {
  return res.status(404).send("N/A");
});

// Authentication routes
app.get("/api/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});

// Connects to the mongodb database
connectToDB();
