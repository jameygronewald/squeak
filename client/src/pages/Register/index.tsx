import React, { useState, useContext } from 'react';
import { RegisterInfoState } from '../../interfaces';
import UserContext from '../../context/UserContext';
import axios from 'axios';

import './style.css';

const Register: React.FC = (): JSX.Element => {
  const [registerInfo, setRegisterInfo] = useState<RegisterInfoState>({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { handleLogin } = useContext(UserContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    registerInfo.password === registerInfo.passwordConfirm
      ? registerUser(registerInfo)
      : window.alert('Password and confirmation must match');
  };

  const registerUser = async (newUserInfo: RegisterInfoState) => {
    try {
      const response = await axios.post('/register', newUserInfo);
      if (response.data.error === true) throw new Error();
      if (handleLogin) {
        handleLogin(response.data.body.sessionToken);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className='registerContainer'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email: </label>
        <input
          type='text'
          name='email'
          value={registerInfo.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setRegisterInfo({ ...registerInfo, email: e.target.value })
          }
        />
        <label htmlFor='password'> Password: </label>
        <input
          type='text'
          name='password'
          value={registerInfo.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setRegisterInfo({ ...registerInfo, password: e.target.value })
          }
        />
        <label htmlFor='passwordConfirm'> Confirm your password: </label>
        <input
          type='text'
          name='passwordConfirm'
          value={registerInfo.passwordConfirm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setRegisterInfo({
              ...registerInfo,
              passwordConfirm: e.target.value,
            })
          }
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Register;
