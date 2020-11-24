import * as jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

const tokenHelper = {
  generateToken: function (id: string) {
    const token = {
      sessionToken: this.signjwt(id),
    };
    return token;
  },

  signjwt: (id: string) => {
    const tokenSecret: string = process.env.JWT_SECRET;
      return jwt.sign(
        {
          data: id,
        },
        tokenSecret,
        { expiresIn: "1y" }
      );
  },

  verifyToken: (tokenValue: string) => {
    const tokenSecret: string = process.env.JWT_SECRET;
      return jwt.verify(tokenValue, tokenSecret);
  },
};

export default tokenHelper;