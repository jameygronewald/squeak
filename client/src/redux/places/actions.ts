import axios from 'axios';
import store from '../store';
import {
  FETCH_PLACES,
  GET_SAVED_PLACES,
  SAVE_PLACE,
  DELETE_PLACE,
  CLEAR_FETCHED_PLACES_STATE,
  CLEAR_SAVED_PLACES_STATE,
  CLEAR_PLACE_STATE,
} from './constants';
import { addExtraQuote } from './helpers';
import { SearchData } from '../../global';
import { SearchResults } from '../../interfaces';

export const fetchPlaces = (
  searchParams: any,
  sessionToken: string | undefined
) => async () => {
  try {
    const res = await axios.post('/places/fetch', searchParams);
    const { businesses } = res.data.body;

    const searchDisplayData: SearchData[] = businesses.map(
      (business: SearchResults) => {
        const { id, name, phone, rating } = business;
        const { address1, city, state, zip_code } = business.location;
        const yelp_id = id;
        const user_id = sessionToken;
        return {
          yelp_id,
          user_id,
          name,
          phone,
          rating,
          address1,
          city,
          state,
          zip_code,
        };
      }
    );

    localStorage.setItem('fetchedPlaces', JSON.stringify(searchDisplayData));

    store.dispatch({
      type: FETCH_PLACES,
      payload: searchDisplayData,
    });
  } catch (error) {
    console.error(error.message);
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
    console.error(error.message);
    alert('Error getting saved places.');
  }
};

export const savePlace = (place: SearchData) => async () => {
  const { name, address1, city } = place;
  const formattedValues = addExtraQuote(name, address1, city);
  place = {
    ...place,
    name: formattedValues[0],
    address1: formattedValues[1],
    city: formattedValues[2],
  };
  try {
    const response = await axios.post('/places', place);
    if (response.data.error === true) throw new Error(response.data.message);
    store.dispatch({
      type: SAVE_PLACE,
      payload: response.data.body,
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const deletePlace = (placeId: number) => async () => {
  try {
    await axios.delete(`/places/${placeId}`);

    store.dispatch({ type: DELETE_PLACE, payload: placeId });
  } catch (error) {
    alert('Error updating redux state.');
  }
};

export const clearFetchedPlacesState = () => {
  localStorage.removeItem('fetchedPlaces');
  try {
    store.dispatch({ type: CLEAR_FETCHED_PLACES_STATE });
  } catch (error) {
    console.error(error.message);
  }
};

export const clearSavedPlacesState = () => {
  try {
    store.dispatch({ type: CLEAR_SAVED_PLACES_STATE });
  } catch (error) {
    console.error(error.message);
  }
};

export const clearPlaceState = () => {
  try {
    store.dispatch({ type: CLEAR_PLACE_STATE });
  } catch (error) {
    console.error(error.message);
  }
};
