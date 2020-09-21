import React, { useContext } from "react";
import { Header } from "./Header";
import { Button } from "./Button";
import { UserContext } from "../utils/UserContext";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface LogoutProps extends RouteComponentProps {}

const Navbar: React.FC<LogoutProps> = ({ history }): JSX.Element => {
  const { authStatus, setAuthStatus } = useContext(UserContext);

  const logoutUser = (): void => {
    localStorage.clear();
    if (setAuthStatus) setAuthStatus({ isAuthenticated: false });
    history.push("/");
  };

  return (
    <div className="navbar">
      <Header
        text={authStatus?.isAuthenticated ? "Squeak" : "Welcome to Squeak"}
        className="navHeader"
      />
      <Button className="logoutButton" text="Log Out" onClick={logoutUser} />
    </div>
  );
};

export default withRouter(Navbar);
