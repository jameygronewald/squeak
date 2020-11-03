import React, { useState, useContext } from "react";
import UserContext from "../utils/UserContext";
import { UserCredentialsState } from "../interfaces";
import axios from "axios";

const Login: React.FC = (): JSX.Element => {
  const [credentials, setCredentials] = useState<UserCredentialsState>({
    email: "",
    password: "",
  });

  const { handleLogin } = useContext(UserContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      return window.alert('You must enter your email and password to login.')
    } else loginUser(credentials);
  };

  const loginUser = async (loginInfo: UserCredentialsState): Promise<void> => {
    try {
      const response = await axios.post("/login", loginInfo);
      if (response.data.error === true) throw new Error();
      if (handleLogin) {
        handleLogin(response.data.body.sessionToken);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="loginContainer">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          name="email"
          value={credentials.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        <label htmlFor="password"> Password: </label>
        <input
          type="text"
          name="password"
          value={credentials.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
