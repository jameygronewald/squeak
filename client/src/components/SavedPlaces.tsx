import React, { useEffect, useContext } from "react";
import store from "../redux/store";
import { useSelector } from "react-redux";
import { UserContext } from "../utils/UserContext";
import { stat } from "fs";

export const SavedPlaces = (props: any) => {
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
    console.log(store.getState());
  };

  return <div className="savedPlaceContainer">
    <ul>
      {places.map((place: any) => (
        <li>
          {place.name}
        </li>
      ))}
    </ul>
  </div>;
};
