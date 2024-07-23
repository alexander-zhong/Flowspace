import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGO_URI;

// Connection to db otherwise, exit the program
const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(URI);
    console.log("Successfully connected to db.");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectToDB;
