import * as jwt from "jsonwebtoken";

const tokenHelper = {
  generateToken: function (id: string) {
    const token = {
      sessionToken: this.signjwt(id),
    };
    return token;
  },

  signjwt: function (id: string) {
    const tokenSecret = process.env.SECRET;
    // if (tokenSecret !== undefined) {
      return jwt.sign(
        {
          data: id,
        },
        'tokenSecret',
        { expiresIn: "7d" }
      );
    // }
  },

  verifyToken: function (tokenValue: string) {
    const tokenSecret = process.env.SECRET;
    // if (tokenSecret !== undefined) {
      return jwt.verify(tokenValue, 'tokenSecret');
    // }
  },
};

export default tokenHelper;