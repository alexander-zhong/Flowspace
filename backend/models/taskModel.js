import mongoose from "mongoose";

// Schema for tasks (no collection in mongodb just for embedded schema in users)
const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    subtasks: {
      type: [String],
      required: true,
    },
  },
  {
    _id: false,
  }
);

export default taskSchema;
