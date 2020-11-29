import axios from 'axios';
import store from '../store';
import {
  SAVE_PLACE,
  DELETE_PLACE,
  GET_SAVED_PLACES,
  CLEAR_SAVED_PLACES,
  FETCH_PLACES,
} from './constants';
import { SavedPlaceInterface } from '../../global';

export const savePlace = (place: SavedPlaceInterface) => {
  return { type: SAVE_PLACE, place };
};

export const deletePlace = (placeId: number) => async () => {
  try {
    const res = await axios.delete(`/places/${placeId}`);

    store.dispatch({ type: DELETE_PLACE, payload: placeId });
    alert(res.data.message);
  } catch (error) {
    alert('Error updating redux state.');
  }
};

export const getSavedPlaces = async (sessionToken: string) => {
  try {
    const response = await axios.get(`/places/${sessionToken}`);
    store.dispatch({
      type: GET_SAVED_PLACES,
      payload: response.data.body,
    });
  } catch (error) {
    alert('Error getting saved places.');
  }
};

export const clearSavedPlaces = () => {
  return { type: CLEAR_SAVED_PLACES };
};

export const fetchPlaces = () => {
  return { type: FETCH_PLACES };
};
