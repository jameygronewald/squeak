import { ORM } from "../server/config/ORM";

export const User = {
  selectUser: async function (user_id: string) {
    try {
      const result = await ORM.selectOne("users", user_id);
    } catch (err) {
      console.error(err.message);
    }
  },

  createUser: async function (columns: any, values: any) {
    try {
        console.log('model: ', columns, values)
      const result = await ORM.insertOne("users", columns, values);
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
