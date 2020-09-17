import * as express from "express";
import { Place } from "../models/Place";

const router = express.Router();

router.post("/places", async (req, res) => {
  try {
    const newPlaceData = await req.body;
    const columns = Object.keys(newPlaceData);
    console.log(columns);
    let values = [];
    for (let key in newPlaceData) {
      values.push(newPlaceData[key]);
    }
    console.log(values);
    const newPlace = await Place.savePlace(columns, values);
    console.log(newPlace);
    res.status(201).json({
      error: false,
      body: newPlace,
      message: "Successfully saved new place.",
    });
  } catch (err) {
    console.error(err.message);
    res.status(401).json({
      error: true,
      body: null,
      message: "Unable to save new place.",
    });
  }
});

module.exports = router;
