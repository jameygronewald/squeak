import React from "react";
import { Link } from "react-router-dom";

export const Home: React.FC = (): JSX.Element => {
  return (
    <div>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
      <Link to="/login">
        <button>Log In</button>
      </Link>
    </div>
  );
};
