import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtHelper = {
  generateSessionToken: (id: string) => {
    const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
    return jwt.sign({ data: id }, secret, {
      expiresIn: '1y',
    });
  },

  verifySessionToken: (sessionToken: string) => {
    const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
    return jwt.verify(sessionToken, secret);
  },

  parseUserIdFromJwt: function (jwt: string): number | undefined {
    const payload = this.verifySessionToken(jwt);
    if (!payload) return;
    let parsedUserIdObject: { data: number };
    if (typeof payload == 'object') {
      parsedUserIdObject = payload as { data: number };
    }
    const parsedUserId = parsedUserIdObject.data;
    return parsedUserId;
  },
};

export default jwtHelper;
