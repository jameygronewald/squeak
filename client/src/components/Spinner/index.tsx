import React from 'react';
import spinner from './spinner.gif';

import './style.css';

const Spinner: React.FC = (): JSX.Element => {
  return (
    <>
      <img
        src={spinner}
        className='spinner'
        alt='Loading...'
      />
    </>
  );
};

export default Spinner;
