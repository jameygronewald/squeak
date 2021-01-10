import express from 'express';
import axios from 'axios';
import Place from '../models/Place';
import jwtHelper from '../helpers/jwtHelper';
import dotenv from 'dotenv';
dotenv.config();
import { YelpSearchConfig } from '../helpers/interfaces';

const router = express.Router();

router.post('/places/fetch', async (req, res) => {
  try {
    const { search, city } = req.body;

    const URL: string = `https://api.yelp.com/v3/businesses/search?term=${search}&location=${city}`;
    const searchConfig: YelpSearchConfig = {
      headers: {
        Authorization: 'Bearer ' + process.env.REACT_APP_YELP_API_KEY,
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.get(URL, searchConfig);

    const { businesses } = response.data;

    res.status(200).json({
      error: false,
      body: businesses,
      message: 'Successfully retrieved search results.',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: true,
      body: null,
      message: 'Unable to fetch places.',
    });
  }
});

router.get('/places/:userId', async (req, res) => {
  try {
    const unparsedUserId: string = req.params.userId;
    const parsedUserId: number | undefined = jwtHelper.parseUserIdFromJwt(
      unparsedUserId
    );
    let savedPlaces;
    if (parsedUserId) savedPlaces = await Place.getSavedPlaces(parsedUserId);
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

    const unparsedUserId: string = newPlaceData.user_id;
    const parsedUserId: number | undefined = jwtHelper.parseUserIdFromJwt(
      unparsedUserId
    );
    if (!parsedUserId) throw new Error('Unable to add new place.');
    newPlaceData.user_id = parsedUserId;

    const newPlace = await Place.savePlace(newPlaceData);
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
      message: 'Server error. Unable to save new place.',
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
