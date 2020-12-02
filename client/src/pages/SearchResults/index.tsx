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
    <div className='searchResultsContainer'>
      <Link to='/dashboard'>
        <button onClick={clearFetchedPlacesState}>Back to dashboard</button>
      </Link>
      {fetchedPlaces.length === 0 ? (
        <Spinner />
      ) : (
        fetchedPlaces.map((place: SearchData) => (
          <ul key={place.yelp_id} className='searchResult'>
            <h2>{place.name}</h2>
            <p>
              <span>Address:</span> {place.address1} / {place.city}, {place.state}
            </p>
            <p><span>Phone:</span> {place.phone}</p>
            <p><span>Rating:</span> {place.rating}</p>
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
