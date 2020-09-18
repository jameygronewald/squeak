import { SAVE_PLACE } from "./constants";
import { SavedPlaceObject } from "../../global";

interface SavedPlacesState {
  savedPlaces: SavedPlaceObject[];
}

const initialState: SavedPlacesState = {
    savedPlaces: []
};

export default function placesReducer(state: SavedPlacesState = initialState, action: any) {
    switch(action.type) {
        case SAVE_PLACE: {
            const arrayToReturn = [...state.savedPlaces];
            console.log(arrayToReturn);
            arrayToReturn.push(action.payload);
            console.log(action.payload);
            return { ...state, savedPlaces: arrayToReturn }
        }
        default:
            return state
    }
}