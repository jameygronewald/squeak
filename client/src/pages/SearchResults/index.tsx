import React from 'react';
import { Link } from 'react-router-dom';
import { savePlace } from '../../redux/places/actions';
import { SearchData } from '../../interfaces';
import { useSelector } from 'react-redux';

const Search: React.FC = (): JSX.Element => {
  const fetchedPlaces = useSelector((state: any) => state.places.fetchedPlaces);

  return (
    <>
      <Link to='/dashboard'>
        <button>Back to dashboard</button>
      </Link>
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
    </>
  );
};

export default Search;
