import mongoose from "mongoose";

// Schema for tasks (no collection in mongodb just for embedded schema in users)
const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtasks: {
      type: [{ task: String, check: Boolean }],
      required: true,
    },
  },
  {
    _id: true,
  }
);

export default taskSchema;
