import {
  Box,
  Button,
  FormControl,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import logo from "../assets/LoginLogo.png";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const directRegister = () => {
    return navigate("/register");
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Box component="img" src={logo} width={180} mt={8}></Box>

        <TextField
          type="email"
          label="Email"
          required={true}
          variant="outlined"
        />
        <TextField
          type="password"
          label="Password"
          required={true}
          variant="outlined"
        />
        <Typography
          variant="body2"
          sx={{ fontSize: 12, fontStyle: "bold", my: 0 }}
        >
          No account? <Link onClick={directRegister}>Register here.</Link>
        </Typography>
        <Button type="submit" variant="outlined">
          Login
        </Button>
      </Box>
    </>
  );
};

export default LoginPage;
