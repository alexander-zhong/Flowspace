import { Toolbar, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppBar from "../components/Appbar";

const AppTemplate = () => {
  return (
    <>
      <AppBar />
      <Toolbar />
      <Box component="main">
        <Outlet />
      </Box>
    </>
  );
};

export default AppTemplate;
