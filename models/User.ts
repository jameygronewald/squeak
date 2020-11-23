import ORM from "../server/config/ORM";

const User = {
  selectUser: async (email: string) => {
    try {
      const result = await ORM.selectOne("users", "email", email);
      return result;
    } catch (err) {
      console.error("Models: " + err.message);
    }
  },

  createUser: async (columns: any, values: any) => {
    try {
      const result = await ORM.insertOne("users", columns, values);
      return result;
    } catch (err) {
      console.error("Model: " + err.message);
    }
  },

  deleteUser: async (user_id: string) => {
    try {
      const result = await ORM.deleteOneById("users", user_id);
      return result;
    } catch (err) {
      console.error(err.message);
    }
  },
};

export default User;