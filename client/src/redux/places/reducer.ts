import { SAVE_PLACE, GET_SAVED_PLACES } from "./constants";
import { SavedPlaceObject } from "../../global";

interface SavedPlacesState {
  savedPlaces: SavedPlaceObject[];
}

const initialState: SavedPlacesState = {
    savedPlaces: []
};

export default function placesReducer(state: SavedPlacesState = initialState, action: any) {
    switch(action.type) {
        case GET_SAVED_PLACES: {
            console.log(action.payload)
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