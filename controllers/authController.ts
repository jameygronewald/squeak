import * as express from "express";
import { User } from "../models/User";

const router = express.Router();

router.post("/signup", async (req, res) => {
  let newUser;
  try {
    const newUserInfo = await req.body;
    const keys = Object.keys(newUserInfo);
    const columns = keys.slice(0, -1);
    const columnString = columns.join(", ");
    // let values = "";
    let values = [];
    for (let key in newUserInfo) {
    //   values += newUserInfo[key] + ", ";
        values.push(newUserInfo[key]);
    }
    const valueString = values.slice(0, -12);
    values.slice(0, 1);
    console.log(values);
    newUser = await User.createUser(columns, values);
  } catch (err) {
    console.error(err.message);
    res.status(401).json({
      error: true,
      body: null,
      message: "Unable to create new user.",
    });
  }
  if (newUser) {
    res.status(201).json({
      error: false,
      body: newUser,
      message: "Successfully created new user.",
    });
  }
});

module.exports = router;
