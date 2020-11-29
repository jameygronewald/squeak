import React from 'react';
import { Link } from 'react-router-dom';
import './NoMatch.css';

const NoMatch = () => {
  return (
    <div className='noMatchContainer'>
      <h3 className='noMatchText'>
        I'm sorry, the page you are looking for does not exist.
      </h3>
      <Link className='backButton' to='/welcome'>
        <button>Go Back</button>
      </Link>
    </div>
  );
};

export default NoMatch;
