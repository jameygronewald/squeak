import { ORM } from "../server/config/ORM";

export const User = {
  selectUser: async function (email: string) {
    try {
      const result = await ORM.selectOne("users", "email", email);
      return result;
    } catch (err) {
      console.error("Models: " + err.message);
    }
  },

  createUser: async function (columns: any, values: any) {
    try {
      const result = await ORM.insertOne("users", columns, values);
      return result;
    } catch (err) {
      console.error("Model: " + err.message);
    }
  },

  deleteUser: async function (user_id: string) {
    try {
      const result = await ORM.deleteOne("users", user_id);
    } catch (err) {
      console.error(err.message);
    }
  },
};
