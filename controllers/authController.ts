import * as express from "express";
import { User } from "../models/User";

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
    const newUser = await User.createUser(columns, slicedValues);
    console.log(newUser);
    res.status(201).json({
      error: false,
      body: newUser,
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
