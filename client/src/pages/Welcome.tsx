import React, { useState } from "react";

interface SearchParamsObject {
  search: string
  city: string
}

export const Welcome: React.FC = (): JSX.Element => {
  const [searchParams, setSearchParams] = useState<SearchParamsObject>({
    search: '',
    city: ''
  });

  const searchForPlaces = async (): Promise<void> => {
    const { search, city } = searchParams;
    const URL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${search}&location=${city}`;
    const config = {
      method: "GET",
      headers: {
        Authorization:
          "Bearer ",
        "Content-Type": "application/json",
      },
    };
    const data = await fetch(URL, config);
    const dataJSON = await data.json();
    console.log(dataJSON);
  };

  return (
    <div>
      <h1>Get Started</h1>
      <input
        type="text"
        name="search"
        value={searchParams.search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setSearchParams({...searchParams, search: e.target.value})
        }
      />
      <input
        type="text"
        name="city"
        value={searchParams.city}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setSearchParams({...searchParams, city: e.target.value})
        }
      />
      <button type="button" onClick={searchForPlaces}>
        Search
      </button>
    </div>
  );
};
