import React, { useContext } from "react";
import Header from "../Header";
import UserContext from "../../context/UserContext";
import { clearPlaceState } from '../../redux/places/actions';
import { RouteComponentProps, withRouter } from "react-router-dom";

import './style.css';

interface LogoutProps extends RouteComponentProps {}

const Navbar: React.FC<LogoutProps> = ({ history }): JSX.Element => {
  const { authStatus, setAuthStatus, setSessionToken } = useContext(UserContext);

  const logoutUser = (): void => {
    localStorage.clear();
    if (setSessionToken) setSessionToken('');
    if (setAuthStatus) setAuthStatus({ isAuthenticated: false });
    clearPlaceState();
    history.push("/");
  };

  return (
    <div className={authStatus?.isAuthenticated ? "navbar" : "navbarNoAuth"}>
      <div className={authStatus?.isAuthenticated ? "navSpacer" : "hide"}></div>
      <Header
        text={authStatus?.isAuthenticated ? "Squeak" : "Welcome to Squeak"}
        className="navHeader"
      />
      {authStatus?.isAuthenticated && <button className="logoutButton" onClick={logoutUser}>Log Out</button>}
    </div>
  );
};

export default withRouter(Navbar);
