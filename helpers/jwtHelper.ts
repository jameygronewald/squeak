import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const jwtHelper = {
  generateSessionToken: (id: string) =>
    jwt.sign({ data: id }, process.env.JWT_SECRET, {
      expiresIn: '1y',
    }),

  verifySessionToken: (sessionToken: string) => jwt.verify(sessionToken, process.env.JWT_SECRET),

  parseUserIdFromJwt: function (jwt: string): number {
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
