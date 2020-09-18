import { SAVE_PLACE } from './constants';
import { SavedPlaceObject } from '../../global';

export const savePlace = (place: SavedPlaceObject) => {
    return { type: SAVE_PLACE, place }
};