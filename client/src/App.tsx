import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route as PublicRoute } from "react-router-dom";
import { UserContext } from "./utils/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Welcome } from "./pages/Welcome";
import "./App.css";

function App() {
  const [sessionToken, setSessionToken] = useState<string>("");
  const [authStatus, setAuthStatus] = useState({ isAuthenticated: false });

  const handleLogin = (token: string) => {
    setSessionToken(token);
    setAuthStatus({ isAuthenticated: true });
    localStorage.setItem("sessionToken", token);
  };

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
          <Switch>
            <PublicRoute exact path="/" component={Home} />
            <PublicRoute exact path="/login" component={Login} />
            <PublicRoute exact path="/signup" component={Signup} />
            <ProtectedRoute exact path="/welcome" component={Welcome} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
