import axios from 'axios';
import store from '../store';
import {
  SAVE_PLACE,
  DELETE_PLACE,
  GET_SAVED_PLACES,
  CLEAR_SAVED_PLACES,
  FETCH_PLACES,
} from './constants';
import { addExtraQuote } from '../../pages/Dashboard/functions';
import { SearchData } from '../../global';
import { SearchConfig, SearchResults } from '../../interfaces';

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

export const fetchPlaces = (
  searchParams: any,
  sessionToken: string | undefined
) => async () => {
  try {
    const { search, city } = searchParams;
    const URL: string = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${search}&location=${city}`;

    const searchConfig: SearchConfig = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + process.env.REACT_APP_YELP_API_KEY,
        'Content-Type': 'application/json',
      },
    };

    const data = await fetch(URL, searchConfig);
    const dataJSON = await data.json();
    const searchResults = dataJSON.businesses;

    const searchDisplayData: SearchData[] = searchResults.map(
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
    store.dispatch({
      type: FETCH_PLACES,
      payload: searchDisplayData,
    });
  } catch (error) {
    console.error(error.message);
  }
};
