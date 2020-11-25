import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const tokenHelper = {
  generateSessionToken: function (id: string) {
    const sessionToken = this.signJwt(id);
    return sessionToken;
  },

  signJwt: (id: string) => {
    const tokenSecret: string = process.env.JWT_SECRET;
    return jwt.sign(
      {
        data: id,
      },
      tokenSecret,
      { expiresIn: '1y' }
    );
  },

  verifySessionToken: (tokenValue: string) => {
    const tokenSecret: string = process.env.JWT_SECRET;
    return jwt.verify(tokenValue, tokenSecret);
  },
};

export default tokenHelper;
