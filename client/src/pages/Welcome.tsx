import React, { useState } from "react";
import {
  SearchParams,
  SearchConfig,
  SearchResults,
  SearchData,
} from "../interfaces";

export const Welcome: React.FC = (): JSX.Element => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    search: "",
    city: "",
  });

  const [searchedPlaces, setSearchPlaces] = useState<SearchData[]>([]);

  const searchForPlaces = async (): Promise<void> => {
    const { search, city } = searchParams;
    const URL: string = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${search}&location=${city}`;
    const searchConfig: SearchConfig = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_YELP_API_KEY,
        "Content-Type": "application/json",
      },
    };
    const data = await fetch(URL, searchConfig);
    const dataJSON = await data.json();
    const searchResults = dataJSON.businesses;
    const searchDisplayData: SearchData[] = searchResults.map(
      (business: SearchResults) => {
        const { id, name, phone, rating } = business;
        const { address1, city, state, zip_code } = business.location;
        return { id, name, phone, rating, address1, city, state, zip_code };
      }
    );
    setSearchPlaces(searchDisplayData);
  };

  const savePlace = async (place: SearchData): Promise<void> => {
    console.log("saving...", place);
    try {
      const savePlaceConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(place),
      };
      const response = await fetch(
        "http://localhost:3001/places",
        savePlaceConfig
      );
      // const responseData = response.json();
      console.log(response);
      // console.log(responseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h1>Get Started</h1>
      <label htmlFor="search">Search by business name: </label>
      <input
        type="text"
        name="search"
        value={searchParams.search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setSearchParams({ ...searchParams, search: e.target.value })
        }
      />
      <label htmlFor="city"> And city: </label>
      <input
        type="text"
        name="city"
        value={searchParams.city}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setSearchParams({ ...searchParams, city: e.target.value })
        }
      />
      <button type="button" onClick={searchForPlaces}>
        Search
      </button>
      {searchedPlaces.map((place: SearchData) => (
        <ul key={place.id}>
          <h3>{place.name}</h3>
          <li>
            {place.address1} / {place.city}, {place.state}
          </li>
          <li>{place.phone}</li>
          <li>{place.rating}</li>
          <button
            type="button"
            onClick={(): void => {
              savePlace(place);
            }}
          >
            Save this place
          </button>
        </ul>
      ))}
    </div>
  );
};
