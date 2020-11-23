import ORM from '../server/config/ORM';

const Place = {
  getSavedPlaces: async (id: number) => {
    try {
      const result = await ORM.selectAllBelongingToUser('place', id);
      return result;
    } catch (err) {
      console.error(err.message);
    }
  },

  savePlace: async (columns: string[], values: any[]) => {
    try {
      const result = await ORM.insertOne('place', columns, values);
      return result;
    } catch (err) {
      console.error(err.message);
    }
  },

  deletePlace: async (id: string) => {
    try {
      const result = await ORM.deleteOneById('place', id);
      return result;
    } catch (err) {
      console.error(err.message);
    }
  },
};

export default Place;
