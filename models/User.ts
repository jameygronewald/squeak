import ORM from "../server/config/ORM";

const User = {
  findUserByEmail: async (email: string) => {
    try {
      const result = await ORM.findOne("users", "email", email);
      return result;
    } catch (err) {
      console.error("Models: " + err.message);
    }
  },

  createUser: async (columnValuePairs) => {
    try {
      const result = await ORM.insertOne("users", columnValuePairs);
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