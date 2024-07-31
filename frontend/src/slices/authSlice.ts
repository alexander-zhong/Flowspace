import { createSlice } from "@reduxjs/toolkit";

// interface for user information
interface UserInfo {
  id: string;
  name: string;
  email: string;
}

// Authstate
interface AuthState {
  userInfo: UserInfo | null; // Can be null when not logged in
}

// Defining initial state
const initialState: AuthState = {
  userInfo: localStorage.getItem("userInfo") // checks if userInfo exists
    ? JSON.parse(localStorage.getItem("userInfo") as string)
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
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
