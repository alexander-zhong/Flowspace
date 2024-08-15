import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDB from "./config/dbSetup.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import AIRoutes from "./routes/AIRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

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
    credentials: true,
  })
);

// Home
app.get("/", (req, res) => {
  return res.status(404).send("N/A");
});

// User & Tasks routes
app.use("/api/users", userRoutes);
// AI Routes
app.use("/api/ai", AIRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});

// Connects to the mongodb database
connectToDB();
