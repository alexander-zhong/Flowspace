import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import logo from "../assets/Navbar.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

// Items for users that are not logged in
const navPublicItems = [
  { name: "Flowspace", path: "/" },
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
];

// Items for users that are logged in
const navUserItems = [
  { name: "Overview", path: "/overview" },
  { name: "Tasks", path: "/tasks" },
  { name: "Focus", path: "/focus" },
];

export default function Navbar(props: Props) {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Handle drawer toggle for mobile users
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const navigate = useNavigate();

  // Logout handler
  const logoutHandler = async () => {
    try {
      await logoutApiCall({}).unwrap();
      // Dispatch local user info
      dispatch(logout({}));
      navigate("/");
      toast.success("Successfully logged out");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Box component="img" sx={{ height: 38 }} src={logo} />
      </Typography>
      <Divider />
      <List>
        {userInfo
          ? navUserItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{ textAlign: "center" }}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))
          : navPublicItems.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{ textAlign: "center" }}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
        {userInfo ? (
          <ListItem key="Logout" disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={logoutHandler}
            >
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        ) : null}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: "white" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "primary.main" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            <Box component="img" sx={{ height: 38 }} src={logo} />
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {userInfo
              ? navUserItems.map((item) => (
                  <Button
                    component={Link}
                    to={item.path}
                    key={item.name}
                    sx={{ textTransform: "none" }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {item.name}
                    </Typography>
                  </Button>
                ))
              : navPublicItems.map((item) => (
                  <Button component={Link} to={item.path} key={item.name}>
                    <Typography
                      variant="body2"
                      sx={{ textTransform: "none", fontWeight: "bold" }}
                    >
                      {item.name}
                    </Typography>
                  </Button>
                ))}
            {userInfo ? (
              <Button
                onClick={logoutHandler}
                key="logout"
                sx={{ textTransform: "none" }}
              >
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Logout
                </Typography>
              </Button>
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          color="inherit"
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              bgcolor: "white",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
