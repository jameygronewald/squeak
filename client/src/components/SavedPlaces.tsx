import React, { useEffect, useContext } from "react";
import store from "../redux/store";
import { useSelector } from "react-redux";
import { UserContext } from "../utils/UserContext";

export const SavedPlaces = () => {
  const { sessionToken } = useContext(UserContext);

  const places = useSelector((state: any) => state.places.savedPlaces)

  useEffect(() => {
    getSavedPlaces();
  }, []);

  const getSavedPlaces = async () => {
    const URL: string = "http://localhost:3001/places/" + sessionToken;
    const response = await fetch(URL);
    const responseData = await response.json();
    store.dispatch({
      type: "GET_SAVED_PLACES",
      payload: responseData.body,
    });
  };

  return <div className="savedPlaceContainer">
    <ul>
      {places.map((place: any) => (
        <h3 key={place.place_id}>
          {place.name}
        </h3>
      ))}
    </ul>
  </div>;
};
