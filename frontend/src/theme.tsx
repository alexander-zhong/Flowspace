import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: { main: "#FFFFFF" },
    background: {
      default: "#FFFFFF",
    },
    secondary: { main: "#006ad2" },
  },
  typography: {
    body2: {
      color: "#4d545c",
    },
  },
});

export default theme;
