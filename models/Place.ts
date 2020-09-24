import { ORM } from "../server/config/ORM";

export const Place = {
  getSavedPlaces: async function (id: number) {
    try {
      const result = await ORM.selectAllWhere('place', id);
      return result;
    } catch (err) {
      console.error(err.message)
    }
  },

  savePlace: async function (columns, values) {
    try {
      const result = await ORM.insertOne("place", columns, values);
      return result;
    } catch (err) {
      console.error(err.message);
    }
  },
};
