import * as express from "express";
import User from "../models/User";
import tokenHelper from "../utils/tokenHelper";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const newUserInfo = await req.body;
    if (!newUserInfo) throw new Error();
    const existingUser = await User.findUserByEmail(newUserInfo.email);
    if (existingUser) {
      throw new Error()
    }
    const keys = Object.keys(newUserInfo);
    const columns = keys.slice(0, -1);
    let values = [];
    for (let key in newUserInfo) {
      values.push(newUserInfo[key]);
    }
    const slicedValues = values.slice(0, -1);
    const newUserData = await User.createUser(columns, slicedValues);
    const token = tokenHelper.generateToken(newUserData.user_id);
    if (!newUserData) throw new Error();
    res.status(201).json({
      error: false,
      body: token,
      message: "Successfully created new user.",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      body: null,
      message: "Unable to create new user.",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const credentials = await req.body;
    const userData = await User.findUserByEmail(credentials.email);
    if (!userData) throw new Error();
    let token: { sessionToken: string };
    if (credentials.password === userData.password) {
      token = tokenHelper.generateToken(userData.user_id);
    }
    if (!token || token === {sessionToken: undefined}) throw new Error();
    res.status(201).json({
      error: false,
      body: token,
      message: "Successfully logged in.",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      body: null,
      message: "Unable to log in.",
    });
  }
});

module.exports = router;
