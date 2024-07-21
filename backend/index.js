import express from "express";
import dotenv from "dotenv";
import cors from "cors";

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
app.get("/", () => {
  return response.status(404).send("N/A");
});

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
