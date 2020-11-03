import React from "react";
import { useSelector } from "react-redux";


export const Search: React.FC = (): JSX.Element => {
  const fetchedPlaces = useSelector((state: any) => state.places.fetchedPlaces);
  console.log('hit')
  return <div>{fetchedPlaces}</div>;
};
