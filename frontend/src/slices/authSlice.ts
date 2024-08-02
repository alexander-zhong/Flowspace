import { createSlice } from "@reduxjs/toolkit";

// Interface corresponding with models from backend
interface Task {
  title: string;
  task: string;
  subtasks: string[];
}

// interface for user information
interface UserInfo {
  id: string;
  name: string;
  email: string;
}
// interface for userTasks
interface UserTasks {
  tasks: Task[];
}

// Authstate
interface AuthState {
  userInfo: UserInfo | null; // Can be null when not logged in
  userTasks: UserTasks | null;
}

// Defining initial state
const initialState: AuthState = {
  userInfo: localStorage.getItem("userInfo") // checks if userInfo exists
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
  userTasks: localStorage.getItem("userTasks")
    ? JSON.parse(localStorage.getItem("userTasks") as string)
    : null,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // get user info and set it into localStorage
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    // logout the frontend userItems
    logout: (state, action) => {
      state.userInfo = null;
      state.userTasks = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userTasks");
    },
    setTasks: (state, action) => {
      state.userTasks = action.payload;
      localStorage.setItem("userTasks", JSON.stringify(action.payload));
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
