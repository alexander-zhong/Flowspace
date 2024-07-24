import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import taskSchema from "./taskModel.js";

// User Schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tasks: {
      type: [taskSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auth method for checking password equals to the database stored password
userSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hashes the password entered when saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
