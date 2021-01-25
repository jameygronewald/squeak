import axios from 'axios';
import { YelpSearchConfig } from '../helpers/interfaces';
import dotenv from 'dotenv';
dotenv.config();

const yelpService = {
  searchForPlaces: async (search: string, city: string) => {
    try {
      const URL: string = `https://api.yelp.com/v3/businesses/search?term=${search}&location=${city}`;
      const searchConfig: YelpSearchConfig = {
        headers: {
          Authorization: 'Bearer ' + process.env.REACT_APP_YELP_API_KEY,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.get(URL, searchConfig);

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default yelpService;
