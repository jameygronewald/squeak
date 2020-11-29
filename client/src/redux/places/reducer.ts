import {
  FETCH_PLACES,
  GET_SAVED_PLACES,
  SAVE_PLACE,
  DELETE_PLACE,
  CLEAR_PLACE_STATE,
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
    case CLEAR_PLACE_STATE: {
      return { ...state, fetchedPlaces: [], savedPlaces: [] };
    }
    default:
      return state;
  }
};

export default placesReducer;
