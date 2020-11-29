import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { fetchPlaces } from '../../redux/places/actions';
import { SearchParams } from '../../interfaces';
import SavedPlaces from '../../components/SavedPlaces';

const Dashboard: React.FC = (): JSX.Element => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    search: '',
    city: '',
  });

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
            <Link to='/search'>
              <button
                type='button'
                onClick={fetchPlaces(searchParams, sessionToken)}
              >
                Search
              </button>
            </Link>
          </div>
        </div>
      </div>
      <SavedPlaces />
    </div>
  );
};

export default Dashboard;
