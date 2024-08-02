import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme.tsx";
// import ErrorPage from "./ErrorPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ProtectedRoute from "./pages/ProtectedRoute.tsx";
import OverviewPage from "./pages/OverviewPage.tsx";
import TasksPage from "./pages/TasksPage.tsx";
import FocusPage from "./pages/FocusPage.tsx";

// Config for redux
import store from "./store.ts";
import { Provider } from "react-redux";

// Router for frontend
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/Tasks" element={<TasksPage />} />
        <Route path="/Focus" element={<FocusPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);
