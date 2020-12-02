import React, { useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import UserContext from '../../context/UserContext';
import { getSavedPlaces, deletePlace } from '../../redux/places/actions';
import DeleteIcon from '@material-ui/icons/Delete';

import './style.css';

const TopRatedPlaces: React.FC = (): JSX.Element => {
  const { sessionToken } = useContext(UserContext);

  const savedPlaces = useSelector((state: any) => state.places.savedPlaces);

  useEffect(() => {
    if (sessionToken) getSavedPlaces(sessionToken);
  }, []);

  // TODO MAKE A TABLE FOR SAVED PLACE DATA
  return (
    <div className='topRatedPlacesContainer'>
      <h2>Top Rated Saved Places</h2>
      <ul>
        {savedPlaces.map((place: any) => (
          <div key={place.place_id} className='topRatedPlace'>
            <h3>{place.name}</h3>
            <button
              className='topRatedPlaceButton'
              onClick={deletePlace(place.place_id)}
            >
              <DeleteIcon />
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TopRatedPlaces;
