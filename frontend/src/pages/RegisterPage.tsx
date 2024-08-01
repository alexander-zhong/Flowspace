import { Box, Button, Link, TextField, Typography } from "@mui/material";
import logo from "../assets/RegisterLogo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { RootState } from "../store";
import { toast } from "react-toastify";

const RegisterPage = () => {
  // Setup
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  // Login setup
  const [register] = useRegisterMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  // Direct user to register
  const directLogin = () => {
    return navigate("/login");
  };

  // Login handler
  const registerHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await register({
        name,
        email,
        password,
        confirmpassword,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success("Successfully registered");
    } catch (err: unknown) {
      toast.error("Email taken or password does not match!");
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
          type="text"
          label="Name"
          required={true}
          variant="filled"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />

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

        <TextField
          type="password"
          label="Confirm Password"
          required={true}
          variant="filled"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <Typography
          variant="body2"
          sx={{ fontSize: 12, fontStyle: "bold", my: 0 }}
        >
          Have an account? <Link onClick={directLogin}>Login here.</Link>
        </Typography>
        <Button
          type="submit"
          onClick={registerHandler}
          variant="outlined"
          color="secondary"
        >
          Register
        </Button>
      </Box>
    </>
  );
};

export default RegisterPage;
