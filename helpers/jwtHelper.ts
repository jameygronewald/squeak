import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtHelper = {
  generateSessionToken: (id: string) => {
    const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
    if (secret.length < 1) return null;
    return jwt.sign({ data: id }, secret, {
      expiresIn: '1y',
    });
  },

  verifySessionToken: (sessionToken: string) => {
    const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
    if (secret.length < 1) return null;
    return jwt.verify(sessionToken, secret);
  },

  parseUserIdFromJwt: function (jwt: string): number | undefined {
    const payload = this.verifySessionToken(jwt);
    if (!payload) return;

    let parsedUserIdObject: { data: number } | null = null;
    parsedUserIdObject =
      typeof payload == 'object' ? (payload as { data: number }) : null;

    let parsedUserId: number | null = null;
    parsedUserId = parsedUserIdObject ? parsedUserIdObject.data : null;

    return parsedUserId ? parsedUserId : undefined;
  },
};

export default jwtHelper;
