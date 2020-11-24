import ORM from '../server/config/ORM';

const Place = {
  getSavedPlaces: async (id: number) => {
    try {
      const result = await ORM.findAllBelongingToUser('place', id);
      return result;
    } catch (err) {
      console.error(err.message);
    }
  },

  savePlace: async (columnValuePairs) => {
    try {
      const result = await ORM.insertOne('place', columnValuePairs);
      return result;
    } catch (err) {
      console.error(err.message);
    }
  },

  updatePlace: async (columnValuePairs, id: string) => {
    try {
      const result = await ORM.updateOneById('place', columnValuePairs, id);
      return result;
    } catch (err) {
      console.error(err.message);
    }
  },

  deletePlace: async (id: string) => {
    try {
      await ORM.deleteOneById('place', id);
    } catch (err) {
      console.error(err.message);
    }
  },
  
};

export default Place;
