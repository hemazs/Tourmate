import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, useLocation } from "react-router-dom";
import LargeSpinner from "../Components/Spinner/LargeSpinner";

const PrivateRoute = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuth0();
  const location = useLocation();

  // While Authenication it will be loading
  if (isLoading) {
    return <LargeSpinner />;
  }

  // If Authenication is true then it will return children
  if (isAuthenticated) {
    return children;
  }
  // If Authenication is false then it will return to home page
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default PrivateRoute;
