import React, { useState, useContext } from 'react';
import { SignupInfoState } from '../interfaces';
import UserContext from '../utils/UserContext';
import axios from 'axios';

const Signup: React.FC = (): JSX.Element => {
  const [signupInfo, setSignupInfo] = useState<SignupInfoState>({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { handleLogin } = useContext(UserContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    signupInfo.password === signupInfo.passwordConfirm
      ? createUser(signupInfo)
      : window.alert('Password and confirmation must match');
  };

  const createUser = async (newUserInfo: SignupInfoState) => {
    try {
      const response = await axios.post('/signup', newUserInfo);
      if (response.data.error === true) throw new Error();
      if (handleLogin) {
        handleLogin(response.data.body.sessionToken);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className='signupContainer'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email: </label>
        <input
          type='text'
          name='email'
          value={signupInfo.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setSignupInfo({ ...signupInfo, email: e.target.value })
          }
        />
        <label htmlFor='password'> Password: </label>
        <input
          type='text'
          name='password'
          value={signupInfo.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setSignupInfo({ ...signupInfo, password: e.target.value })
          }
        />
        <label htmlFor='passwordConfirm'> Confirm your password: </label>
        <input
          type='text'
          name='passwordConfirm'
          value={signupInfo.passwordConfirm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setSignupInfo({ ...signupInfo, passwordConfirm: e.target.value })
          }
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Signup;
