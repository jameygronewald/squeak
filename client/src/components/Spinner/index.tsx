import React from 'react';
import spinner from './spinner.gif';

interface Props {}

const Spinner = (props: Props) => {
  return (
    <>
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Loading...'
      />
    </>
  );
};

export default Spinner;
