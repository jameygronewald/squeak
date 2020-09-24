import React, { useState, useContext } from "react";
import { UserContext } from "../utils/UserContext";
import { UserCredentialsState } from "../interfaces";

export const Login: React.FC = (): JSX.Element => {
  const [credentials, setCredentials] = useState<UserCredentialsState>({
    email: "",
    password: "",
  });

  const { handleLogin } = useContext(UserContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (credentials) loginUser(credentials);
  };

  const loginUser = async (loginInfo: UserCredentialsState): Promise<void> => {
    try {
      const loginConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(loginInfo),
      };
      const response = await fetch("http://localhost:3001/login", loginConfig);
      const JSONdata = await response.json();
      if (handleLogin) {
        handleLogin(JSONdata.body.sessionToken);
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
