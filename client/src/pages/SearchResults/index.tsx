import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { clearFetchedPlacesState, savePlace } from '../../redux/places/actions';
import { SearchData } from '../../interfaces';
import { useSelector } from 'react-redux';

import './style.css';

const Search: React.FC = (): JSX.Element => {

  
  let fetchedPlaces: [] = useSelector(
    (state: any) => state.places.fetchedPlaces
  );

  if (fetchedPlaces.length === 0 && (localStorage.getItem('fetchedPlaces') !== null)) {
    fetchedPlaces = JSON.parse(localStorage.getItem('fetchedPlaces') as string);
  }

  return (
    <div className='searchPageContainer'>
      <Link to='/dashboard'>
        <button onClick={clearFetchedPlacesState}>Back to dashboard</button>
      </Link>
      {fetchedPlaces.length === 0 ? (
        <Spinner />
      ) : (
        fetchedPlaces.map((place: SearchData) => (
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
        ))
      )}
    </div>
  );
};

export default Search;
