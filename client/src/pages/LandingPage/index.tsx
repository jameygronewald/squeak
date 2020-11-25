import React from "react";
import { Link } from "react-router-dom";
import HomeText from "../../components/HomeText";

const LandingPage: React.FC = (): JSX.Element => {
  return (
    <div className="homeContainer">
      <Link className="signupButton" to="/signup">
        <button>Sign Up</button>
      </Link>
      <h3 className="or" >OR</h3>
      <Link className="loginButton" to="/login">
        <button>Log In</button>
      </Link>
      <HomeText className="homeText" text1="Can't remember your favorite dumpling place?" text2="Need the perfect date-night spot?" text3="Squeak is here for you!"/>
    </div>
  );
};

export default LandingPage;
