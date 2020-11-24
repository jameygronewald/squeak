import tokenHelper from './tokenHelper';

const parseUserIdFromJwt = (jwt: string): number => {
  const payload = tokenHelper.verifyToken(jwt);
  if (!payload) return;
  let parsedUserIdObject: { data: number };
  if (typeof payload == 'object') {
    parsedUserIdObject = payload as { data: number };
  }
  const parsedUserId = parsedUserIdObject.data;
  return parsedUserId;
};

export default parseUserIdFromJwt;
