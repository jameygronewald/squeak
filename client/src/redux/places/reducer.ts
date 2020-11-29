import {
  SAVE_PLACE,
  DELETE_PLACE,
  GET_SAVED_PLACES,
  CLEAR_SAVED_PLACES,
  FETCH_PLACES,
} from './constants';
import { SearchData, SavedPlaceInterface } from '../../global';

interface SavedPlacesState {
  fetchedPlaces: SearchData[];
  savedPlaces: SavedPlaceInterface[];
}

const initialState: SavedPlacesState = {
  fetchedPlaces: [],
  savedPlaces: [],
};

const placesReducer = (state: SavedPlacesState = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PLACES: {
      return { ...state, fetchedPlaces: payload };
    }
    case GET_SAVED_PLACES: {
      return { ...state, savedPlaces: payload };
    }
    case CLEAR_SAVED_PLACES: {
      return { ...state, savedPlaces: [] };
    }
    case SAVE_PLACE: {
      return { ...state, savedPlaces: [...state.savedPlaces, payload] };
    }
    case DELETE_PLACE: {
      return {
        ...state,
        savedPlaces: state.savedPlaces.filter(
          place => place.place_id !== payload
        ),
      };
    }
    default:
      return state;
  }
};

export default placesReducer;
