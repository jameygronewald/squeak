import Place from '../models/Place';
import yelpService from '../services/yelpService';
import jwtHelper from '../helpers/jwtHelper';
import { IOutput } from '../helpers/interfaces';
import dotenv from 'dotenv';
dotenv.config();

export const fetchPlaces = async (req, res) => {
  const { search, city } = req.body;

  let output: IOutput = { status: 500, data: {} };

  try {
    const businesses = await yelpService.searchForPlaces(search, city);

    output = {
      status: 200,
      data: {
        body: businesses,
        message: 'Successfully retrieved search results.',
      },
    };
  } catch (err) {
    console.error(err.message);
    output = { status: 400, data: { message: 'Unable to fetch places.' } };
  }
  res.status(output.status).send(output.data);
};

export const getPlace = async (req, res) => {
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
};

export const postPlace = async (req, res) => {
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
};

export const putPlace = async (req, res) => {
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
};

export const deletePlace = async (req, res) => {
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
};
