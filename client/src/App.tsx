import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { UserContext } from "./utils/UserContext";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Welcome } from "./pages/Welcome";
import "./App.css";

function App() {

  const [sessionToken, setSessionToken] = useState<string>('');
  const [userData, setUserData] = useState({
    isAuthenticated: false,
  });

  const handleLogin = (token: string) => {
    setSessionToken(token);
    setUserData({ isAuthenticated: true });
    localStorage.setItem("sessionToken", token);
  };

  return (
    <>
      <Router>
        <UserContext.Provider value={{ handleLogin, sessionToken, setSessionToken, userData, setUserData }}>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/welcome" component={Welcome} />
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
