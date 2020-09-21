import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../utils/UserContext";

interface PublicRouteProps {
  exact: boolean;
  path: string;
  component: React.FC<any>;
}

const PublicRoute: React.FC<PublicRouteProps> = (props: PublicRouteProps): JSX.Element => {
  const { authStatus } = useContext(UserContext);
  const Component = props.component;

  return authStatus && authStatus.isAuthenticated ? (
    <Redirect to="/welcome" />
  ) : (
    <Component />
  );
};

export default PublicRoute;
