import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";

interface ProtectedRouteProps {
  exact?: boolean;
  path: string;
  component: React.FC;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props: ProtectedRouteProps): JSX.Element => {
  const { authStatus } = useContext(UserContext);
  const Component = props.component;

  return authStatus && authStatus.isAuthenticated ? (
    <Component />
  ) : (
    <Redirect to="/" />
  );
};

export default ProtectedRoute;
