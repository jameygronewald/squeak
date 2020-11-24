import * as express from 'express';
import Place from '../models/Place';
import parseUserIdFromJwt from '../utils/parseUserIdFromJwt';

const router = express.Router();

router.get('/places/:userId', async (req, res) => {
  try {
    const unparsedUserId: string = req.params.userId;
    const parsedUserId: number = parseUserIdFromJwt(unparsedUserId);
    const savedPlaces = await Place.getSavedPlaces(parsedUserId);
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

router.post('/places', async (req, res) => {
  try {
    const newPlaceData = await req.body;
    const unparsedUserId = newPlaceData.user_id;
    const parsedUserId: number = parseUserIdFromJwt(unparsedUserId);
    newPlaceData.user_id = parsedUserId;
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
      message: 'Successfully saved new place.',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      body: null,
      message: 'Unable to save new place.',
    });
  }
});

router.put('/places/:id', async (req, res) => {
  try {
    const placeId: string = req.params.id;
    const dataToAdd: {} = await req.body;
    const addedData = await Place.updatePlace(dataToAdd, placeId);
    res.status(200).json({
      error: false,
      body: addedData,
      message: 'Successfully updated place.',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      body: null,
      message: 'Unable to save new place.',
    });
  }
});

router.delete('/places/:id', async (req, res) => {
  try {
    const placeId = req.params.id;
    await Place.deletePlace(placeId);
    res.status(200).json({
      error: false,
      body: null,
      message: 'Successfully deleted place.',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      body: null,
      message: 'Server error. Unable to delete place.',
    });
  }
});

module.exports = router;
