import * as express from "express";
import { User } from "../models/User";
import { tokenHelper } from "../client/src/utils/tokenHelper";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const newUserInfo = await req.body;
    const keys = Object.keys(newUserInfo);
    const columns = keys.slice(0, -1);
    let values = [];
    for (let key in newUserInfo) {
      values.push(newUserInfo[key]);
    }
    const slicedValues = values.slice(0, -1);
    await User.createUser(columns, slicedValues);
    const token = await tokenHelper.generateToken(newUserInfo.email);
    console.log(token);
    res.status(201).json({
      error: false,
      body: token,
      message: "Successfully created new user.",
    });
  } catch (err) {
    console.error(err.message);
    res.status(401).json({
      error: true,
      body: null,
      message: "Unable to create new user.",
    });
  }
});

module.exports = router;
