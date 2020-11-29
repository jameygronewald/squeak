import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import store from '../../redux/store';
import { addExtraQuote } from './functions';
import {
  SearchParams,
  SearchConfig,
  SearchResults,
  SearchData,
} from '../../interfaces';
import SavedPlaces from '../../components/SavedPlaces';
import axios from 'axios';

const Dashboard: React.FC = (): JSX.Element => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    search: '',
    city: '',
  });

  const [searchedPlaces, setSearchPlaces] = useState<SearchData[]>([]);

  const { sessionToken } = useContext(UserContext);

  const searchForPlaces = async (): Promise<any> => {
    const { search, city } = searchParams;
    const URL: string = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${search}&location=${city}`;
    const searchConfig: SearchConfig = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + process.env.REACT_APP_YELP_API_KEY,
        'Content-Type': 'application/json',
      },
    };
    const data = await fetch(URL, searchConfig);
    const dataJSON = await data.json();
    const searchResults = dataJSON.businesses;
    const searchDisplayData: SearchData[] = searchResults.map(
      (business: SearchResults) => {
        const { id, name, phone, rating } = business;
        const { address1, city, state, zip_code } = business.location;
        const yelp_id = id;
        const user_id = sessionToken;
        return {
          yelp_id,
          user_id,
          name,
          phone,
          rating,
          address1,
          city,
          state,
          zip_code,
        };
      }
    );
    setSearchPlaces(searchDisplayData);
    store.dispatch({
      type: 'FETCH_PLACES',
      payload: searchDisplayData,
    });
  };

  const savePlace = async (place: SearchData): Promise<any> => {
    const { name, address1, city } = place;
    const formattedValues = addExtraQuote(name, address1, city);
    place = {
      ...place,
      name: formattedValues[0],
      address1: formattedValues[1],
      city: formattedValues[2],
    };
    try {
      const response = await axios.post('/places', place);
      if (response.data.error === true) throw new Error();
      return store.dispatch({
        type: 'SAVE_PLACE',
        payload: response.data.body,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className='welcomeContainer'>
      <div className='getStartedContainer'>
        <div className='getStarted'>
          <div className='getStartedForm'>
            <h3>Get Started</h3>
            <label htmlFor='search'>Search by business name: </label>
            <input
              type='text'
              name='search'
              value={searchParams.search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setSearchParams({ ...searchParams, search: e.target.value })
              }
            />
            <label htmlFor='city'> And city: </label>
            <input
              type='text'
              name='city'
              value={searchParams.city}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                setSearchParams({ ...searchParams, city: e.target.value })
              }
            />
            <button type='button' onClick={searchForPlaces}>
              Search
            </button>
          </div>
          {searchedPlaces.map((place: SearchData) => (
            <ul key={place.yelp_id}>
              <h3>{place.name}</h3>
              <li>
                {place.address1} / {place.city}, {place.state}
              </li>
              <li>{place.phone}</li>
              <li>{place.rating}</li>
              <button
                type='button'
                onClick={(): void => {
                  savePlace(place);
                }}
              >
                Save place
              </button>
            </ul>
          ))}
        </div>
      </div>
      <SavedPlaces />
    </div>
  );
};

export default Dashboard;
