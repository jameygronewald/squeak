import * as express from 'express';
import User from '../models/User';
import jwtHelper from '../helpers/jwtHelper';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const newUserInfo = req.body;
    delete newUserInfo.passwordConfirm;
    if (!newUserInfo) throw new Error();

    const existingUser = await User.findUserByEmail(newUserInfo.email);
    if (existingUser) {
      throw new Error('User already exists.');
    }

    const newUser = await User.createUser(newUserInfo);

    const sessionToken = jwtHelper.generateSessionToken(newUser.user_id);

    if (!newUser) throw new Error();
    res.status(201).json({
      error: false,
      body: { sessionToken, newUser },
      message: 'Successfully created new user.',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      body: null,
      message: 'Unable to create new user.',
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const credentials = await req.body;

    const userData = await User.findUserByEmail(credentials.email);

    if (!userData) throw new Error('User not found.');

    if (credentials.password !== userData.password)
      throw new Error('Incorrect password.');

    const sessionToken: string | null = jwtHelper.generateSessionToken(
      userData.user_id
    );

    if (!sessionToken || sessionToken === undefined || sessionToken === null) {
      throw new Error();
    }
    res.status(201).json({
      error: false,
      body: { sessionToken, userData },
      message: 'Successfully logged in.',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      body: null,
      message: 'Unable to log in.',
    });
  }
});

module.exports = router;
