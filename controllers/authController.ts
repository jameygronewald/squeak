import * as express from "express";
import { User } from "../models/User";

const router = express.Router();

router.post('/user', (req, res) =>{
    console.log(req.body);
    res.json({message: 'Route hit'})
    // User.createUser()
})

module.exports = router;