import React, { useState } from "react";

interface UserCredentialsState {
  email: string;
  password: string;
}

export const Login: React.FC = (): JSX.Element => {
  const [credentials, setCredentials] = useState<UserCredentialsState>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(credentials);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={credentials.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
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
