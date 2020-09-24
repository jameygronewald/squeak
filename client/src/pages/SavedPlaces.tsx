import React, { useEffect, useContext } from "react";
import store from "../redux/store";
import { UserContext } from "../utils/UserContext";

export const SavedPlaces = () => {
  const { sessionToken } = useContext(UserContext);

  useEffect(() => {
    getSavedPlaces();
  }, []);

  const getSavedPlaces = async () => {
    const URL: string = "http://localhost:3001/places/" + sessionToken;
    const response = await fetch(URL);
    const responseData = await response.json();
    console.log(responseData);
    store.dispatch({
      type: "GET_SAVED_PLACES",
      payload: responseData.body,
    });
  };

  return <div>This is the saved places display.</div>;
};
