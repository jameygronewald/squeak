import { SAVE_PLACE, GET_SAVED_PLACES, CLEAR_SAVED_PLACES, FETCH_PLACES } from "./constants";
import { SearchData, SavedPlaceInterface } from "../../global";

interface SavedPlacesState {
  fetchedPlaces: SearchData[];
  savedPlaces: SavedPlaceInterface[];
}

const initialState: SavedPlacesState = {
    fetchedPlaces: [],
    savedPlaces: []
};

export default function placesReducer(state: SavedPlacesState = initialState, action: any) {
    const { type, payload } = action;
    switch(type) {
        case FETCH_PLACES: {
            return { ...state, fetchedPlaces: payload }
        }
        case GET_SAVED_PLACES: {
            return { ...state, savedPlaces: payload }
        }
        case CLEAR_SAVED_PLACES: {
            return { ...state, savedPlaces: []}
        }
        case SAVE_PLACE: {
            const arrayToReturn = [...state.savedPlaces];
            arrayToReturn.push(payload);
            return { ...state, savedPlaces: arrayToReturn }
        }
        default:
            return state
    }
}