import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { UserContext } from "./utils/UserContext";
import PublicRoute from "./components/ReactRoutes/PublicRoute";
import ProtectedRoute from "./components/ReactRoutes/ProtectedRoute";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Welcome } from "./pages/Welcome";
import { Search } from "./pages/Search";
import { NoMatch } from "./pages/NoMatch";
import "./App.css";

const App = () => {
  const [sessionToken, setSessionToken] = useState<string>("");
  const [authStatus, setAuthStatus] = useState({ isAuthenticated: false });


  const handleLogin = (token: string) => {
    setSessionToken(token);
    setAuthStatus({ isAuthenticated: true });
    localStorage.setItem("sessionToken", token);
  };

  const checkAuthStatus = () => {
    const token = localStorage.getItem("sessionToken");
    if (token && token !== "undefined") handleLogin(token);
  }

  useEffect(() => {
    checkAuthStatus()
  }, []);

  return (
    <>
      <Router>
        <UserContext.Provider
          value={{
            handleLogin,
            sessionToken,
            setSessionToken,
            authStatus,
            setAuthStatus,
          }}
        >
          <Navbar />
          <Switch>
            <PublicRoute exact path="/" component={Home}/>
            <PublicRoute exact path="/login" component={Login} />
            <PublicRoute exact path="/signup" component={Signup} />
            <ProtectedRoute path="/welcome" component={Welcome} />
            <Route path="/search" component={Search} />
            <Route component={NoMatch} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
