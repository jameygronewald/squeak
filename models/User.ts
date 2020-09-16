import { ORM } from "../server/config/ORM";

export const User = {
  selectUser: async function (user_id: string) {
    try {
      const result = await ORM.selectOne("user", user_id);
    } catch (err) {
      console.error(err.message);
    }
  },

  createUser: async function (columns: string, values: string) {
    try {
      const result = await ORM.insertOne("user", columns, values);
    } catch (err) {
      console.error(err.message);
    }
  },

  deleteUser: async function (user_id: string) {
    try {
      const result = await ORM.deleteOne("user", user_id);
    } catch (err) {
      console.error(err.message);
    }
  },
};
