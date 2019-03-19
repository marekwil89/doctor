import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt';

export const getLogedUser = async (headers) => {
  const token = headers['token'];

  return token !== 'null' && await jwt.verify(token, jwtConfig.secret);
};
