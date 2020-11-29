import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import { useSelector } from 'react-redux';
import { savePlace, fetchPlaces } from '../../redux/places/actions';
import {
  SearchParams,
  SearchData,
} from '../../interfaces';
import SavedPlaces from '../../components/SavedPlaces';

const Dashboard: React.FC = (): JSX.Element => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    search: '',
    city: '',
  });

  const fetchedPlaces = useSelector((state: any) => state.places.fetchedPlaces);

  const { sessionToken } = useContext(UserContext);

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
            <button
              type='button'
              onClick={fetchPlaces(searchParams, sessionToken)}
            >
              Search
            </button>
          </div>
          {fetchedPlaces.map((place: SearchData) => (
            <ul key={place.yelp_id}>
              <h3>{place.name}</h3>
              <li>
                Address: {place.address1} / {place.city}, {place.state}
              </li>
              <li>Phone: {place.phone}</li>
              <li>Rating: {place.rating}</li>
              <button type='button' onClick={savePlace(place)}>
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
