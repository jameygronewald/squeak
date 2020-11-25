import { SAVE_PLACE, GET_SAVED_PLACES, CLEAR_SAVED_PLACES, FETCH_PLACES } from "./constants";
import { SavedPlaceInterface } from "../../global";

export const savePlace = (place: SavedPlaceInterface) => {
  return { type: SAVE_PLACE, place };
};

export const getSavedPlaces = () => {
  return { type: GET_SAVED_PLACES };
};

export const clearSavedPlaces = () => {
  return { type: CLEAR_SAVED_PLACES }
}

export const fetchPlaces = () => {
  return { type: FETCH_PLACES };
};
