import React, { useState } from "react";
import { SignupInfoState } from "../interfaces";

export const Signup: React.FC = (): JSX.Element => {
  const [signupInfo, setSignupInfo] = useState<SignupInfoState>({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(signupInfo);
    signupInfo.password === signupInfo.passwordConfirm
      ? createUser(signupInfo)
      : window.alert("Password and confirmation must match");
  };

  const createUser = async (newUserInfo: SignupInfoState) => {
    try {
      const signupConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newUserInfo),
      };
      console.log(signupConfig);
      const response = await fetch("http://localhost:3001/user", signupConfig);
      const JSONdata = await response.json();
      console.log(response);
      console.log(JSONdata);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          name="email"
          value={signupInfo.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setSignupInfo({ ...signupInfo, email: e.target.value })
          }
        />
        <label htmlFor="password"> Password: </label>
        <input
          type="text"
          name="password"
          value={signupInfo.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setSignupInfo({ ...signupInfo, password: e.target.value })
          }
        />
        <label htmlFor="passwordConfirm"> Confirm your password: </label>
        <input
          type="text"
          name="passwordConfirm"
          value={signupInfo.passwordConfirm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setSignupInfo({ ...signupInfo, passwordConfirm: e.target.value })
          }
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
