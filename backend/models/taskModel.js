import mongoose from "mongoose";

// Schema for tasks (no collection in mongodb just for embedded schema in users)
const taskSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  subtasks: {
    type: [this],
    required: true,
  },
});

export default taskSchema;
