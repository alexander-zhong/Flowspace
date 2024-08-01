import NavbarPublic from "../components/NavbarPublic";
import { Toolbar, Box } from "@mui/material";

import { Outlet } from "react-router-dom";

const PublicTemplate = () => {
  return (
    <>
      <NavbarPublic />
      <Toolbar />
      <Box component="main">
        <Outlet />
      </Box>
    </>
  );
};

export default PublicTemplate;
