import { decode } from 'jsonwebtoken';

export const decodeJwt = (token) => {
  try {
    return decode(token);
  } catch (err) {
    return null;
  }
};
