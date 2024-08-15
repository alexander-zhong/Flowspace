import asyncHandler from "express-async-handler";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Set up ai
const genAI = new GoogleGenerativeAI(process.env.AIAPI);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// @desc Auth User/set Token
// POST /api/users/login
// @access Private
const getTasks = asyncHandler(async (req, res) => {
  const { userPrompt, title, taskblob } = req.body;

  const promptEng = `Generate a task list to this user's prompt: (${userPrompt}). You are an assistant that generates a list of tasks for the user in the format where output is simply, task1\ntask2\ntask2 where tasks are seperates with \n. Only output the tasks. Here is the title (${title}) and the current tasks the user wrote down (${taskblob})`;

  const result = await model.generateContent(promptEng);

  return res.status(201).json({
    tasks: result.response.text(),
  });
});

export { getTasks };
