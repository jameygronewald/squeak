import React, { useEffect } from 'react';
import store from "../redux/store";

export const SavedPlaces = () => {

    useEffect(() => {
        getSavedPlaces();
    }, []);

    const getSavedPlaces = () => {
        store.dispatch({
            type: 'GET_SAVED_PLACES'
        });
    }

    return (
        <div>
            This is the saved places display.
        </div>
    )
}
