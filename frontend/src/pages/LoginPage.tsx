import { Box, Button, Link, TextField, Typography } from "@mui/material";
import logo from "../assets/LoginLogo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { RootState } from "../store";
import { toast } from "react-toastify";

const LoginPage = () => {
  // Setup
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login setup
  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  // Direct user to register
  const directRegister = () => {
    return navigate("/register");
  };

  // Login handler
  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      console.log(userInfo?.name || "Hi");
      toast.success("Successfully logged in");
    } catch (err: unknown) {
      toast.error("Invaid Email or Password");
    }
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
          variant="filled"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          type="password"
          label="Password"
          required={true}
          variant="filled"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
        <Typography
          variant="body2"
          sx={{ fontSize: 12, fontStyle: "bold", my: 0 }}
        >
          No account? <Link onClick={directRegister}>Register here.</Link>
        </Typography>
        <Button
          type="submit"
          onClick={loginHandler}
          variant="outlined"
          color="secondary"
        >
          Login
        </Button>
      </Box>
    </>
  );
};

export default LoginPage;
