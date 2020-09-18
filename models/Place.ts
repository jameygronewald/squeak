import { ORM } from "../server/config/ORM";

export const Place = {
  savePlace: async function (columns, values) {
    try {
      const result = await ORM.insertOne("place", columns, values);
      return result;
    } catch (err) {
      console.error(err.message);
    }
  },
};
