import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarPublic from "./components/Navbar";
import { Box, Toolbar } from "@mui/material";

// Mainly for notifications within the app
const App = () => {
  return (
    <>
      <NavbarPublic />
      <Toolbar />
      <Box component="main">
        <ToastContainer />
        <Outlet />
      </Box>
    </>
  );
};

export default App;
