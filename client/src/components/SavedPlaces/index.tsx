import React, { useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import UserContext from '../../context/UserContext';
import { getSavedPlaces, deletePlace } from '../../redux/places/actions';

import './SavedPlaces.css';

const SavedPlaces: React.FC = (): JSX.Element => {
  const { sessionToken } = useContext(UserContext);

  const places = useSelector((state: any) => state.places.savedPlaces);

  useEffect(() => {
    if (sessionToken) getSavedPlaces(sessionToken);
  }, []);

  // TODO MAKE A TABLE FOR SAVED PLACE DATA
  return (
    <div className='savedPlaceContainer'>
      <ul>
        {places.map((place: any) => (
          <div key={place.place_id} className='savedPlace'>
            <h3>{place.name}</h3>
            <button
              className='savedPlaceButton'
              onClick={deletePlace(place.place_id)}
            >
              DELETE
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SavedPlaces;
