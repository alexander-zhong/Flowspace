import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import connectToDB from "./config/dbSetup.js";

// Config the express app
const app = express();
app.use(express.json());
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

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});

// Connects to the mongodb database
connectToDB();
