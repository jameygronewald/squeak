import { SAVE_PLACE, GET_SAVED_PLACES, FETCH_PLACES } from "./constants";
import { SearchData, SavedPlaceObject } from "../../global";

interface SavedPlacesState {
  fetchedPlaces: SearchData[];
  savedPlaces: SavedPlaceObject[];
}

const initialState: SavedPlacesState = {
    fetchedPlaces: [],
    savedPlaces: []
};

export default function placesReducer(state: SavedPlacesState = initialState, action: any) {
    switch(action.type) {
        case FETCH_PLACES: {
            return { ...state, fetchedPlaces: action.payload }
        }
        case GET_SAVED_PLACES: {
            return { ...state, savedPlaces: action.payload }
        }
        case SAVE_PLACE: {
            const arrayToReturn = [...state.savedPlaces];
            arrayToReturn.push(action.payload);
            return { ...state, savedPlaces: arrayToReturn }
        }
        default:
            return state
    }
}