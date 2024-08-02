import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { toast } from "react-toastify";

// Redirect to public route if user is not logged in
const PrivateRoute = () => {
  // Gets user info to see if it exists
  const { userInfo } = useSelector((state: RootState) => state.auth);

  // Notifies the user
  useEffect(() => {
    if (userInfo) {
      return;
    } else {
      toast.error("Please login first!");
    }
  }, [userInfo]);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
