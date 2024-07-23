import mongoose from "mongoose";

// Schema for tasks
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

const Task = mongoose.model("Task", taskSchema);

export default Task;
