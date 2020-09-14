import React, { useState } from "react";

export const Welcome: React.FC = (): JSX.Element => {
  const [search, setSearch] = useState<string>("");

  const searchForPlaces = (): void => {
    console.log(search);
  }

  return (
    <div>
      <h1>Get Started</h1>
      <input
        type="text"
        name="search"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setSearch(e.target.value)
        }
      />
      <button type="button" onClick={searchForPlaces}>Search</button>
    </div>
  );
};
