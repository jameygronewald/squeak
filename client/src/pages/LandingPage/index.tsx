import React from 'react';
import { Link } from 'react-router-dom';
import LandingPageText from '../../components/LandingPageText';

import './style.css';

const LandingPage: React.FC = (): JSX.Element => {
  return (
    <div className='landingPageContainer'>
      <Link className='registerButton' to='/register'>
        <button>Sign Up</button>
      </Link>
      <h3 className='or'>OR</h3>
      <Link className='loginButton' to='/login'>
        <button>Log In</button>
      </Link>
      <LandingPageText
        className='landingPageText'
        text1="Can't remember your favorite dumpling place?"
        text2='Need the perfect date-night spot?'
        text3='Squeak is here for you!'
      />
    </div>
  );
};

export default LandingPage;
