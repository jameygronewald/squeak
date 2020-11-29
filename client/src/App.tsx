import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import UserContext from "./context/UserContext";
import PublicRoute from "./components/ReactRoutes/PublicRoute";
import ProtectedRoute from "./components/ReactRoutes/ProtectedRoute";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/SearchResults";
import NoMatch from "./pages/NoMatch";
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
            <PublicRoute exact path="/" component={LandingPage}/>
            <PublicRoute exact path="/login" component={Login} />
            <PublicRoute exact path="/signup" component={Register} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <Route path="/search" component={Search} />
            <Route component={NoMatch} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
