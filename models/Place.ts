import { ORM } from "../server/config/ORM";

export const Place = {
  savePlace: async function (columns, values) {
    try {
      await ORM.insertOne("place", columns, values);
    } catch (err) {
      console.error(err.message);
    }
  },
};
