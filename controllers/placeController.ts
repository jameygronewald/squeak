import * as express from "express";
import Place from "../models/Place";
import tokenHelper from "../client/src/utils/tokenHelper";

const router = express.Router();

router.get("/places/:userId", async (req, res) => {
  try {
    const unparsedUserId: string = req.params.userId;
    const parsedUserId = tokenHelper.verifyToken(unparsedUserId);
    if (!parsedUserId) throw new Error();
    let parsedUserIdObject: { data: number };
    if (typeof parsedUserId == "object") {
      parsedUserIdObject = parsedUserId as { data: number };
    }
    const parsedId = parsedUserIdObject.data;
    const savedPlaces = await Place.getSavedPlaces(parsedId);
    if (!savedPlaces) throw new Error();
    res.status(200).json({
      error: false,
      body: savedPlaces,
      message: "Successfully retrieved user's saved places.",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      body: null,
      message: "Unable to retrieve user's places.",
    });
  }
});

router.post("/places", async (req, res) => {
  try {
    const newPlaceData = await req.body;
    const unparsedUserId = newPlaceData.user_id;
    const parsedUserId = tokenHelper.verifyToken(unparsedUserId);
    if (!parsedUserId) throw new Error();
    let parsedUserIdObject: { data: number };
    if (typeof parsedUserId == "object") {
      parsedUserIdObject = parsedUserId as { data: number };
    }
    newPlaceData.user_id = parsedUserIdObject.data;
    const columns = Object.keys(newPlaceData);
    let values = [];
    for (let key in newPlaceData) {
      values.push(newPlaceData[key]);
    }
    const newPlace = await Place.savePlace(columns, values);
    if (!newPlace) throw new Error();
    res.status(200).json({
      error: false,
      body: newPlace,
      message: "Successfully saved new place.",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      body: null,
      message: "Unable to save new place.",
    });
  }
});

module.exports = router;
