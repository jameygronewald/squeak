import { SAVE_PLACE, GET_SAVED_PLACES, FETCH_PLACES } from "./constants";
import { SavedPlaceObject } from "../../global";

export const savePlace = (place: SavedPlaceObject) => {
  return { type: SAVE_PLACE, place };
};

export const getSavedPlaces = () => {
  return { type: GET_SAVED_PLACES };
};

export const fetchPlaces = () => {
  return { type: FETCH_PLACES };
};
