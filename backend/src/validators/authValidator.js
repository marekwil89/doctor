import { check } from 'express-validator/check';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt';

export const loginValidator = [
  check('login').isLength({ min: 1 }).withMessage('To pole jest wymagane'),
  check('password').isLength({ min: 1 }).withMessage('To pole jest wymagane')
];

export const registerValidator = [
  check('login').isLength({ min: 1 }).withMessage('To pole jest wymagane'),
  check('password').isLength({ min: 1 }).withMessage('To pole jest wymagane'),
  check('fullName').isLength({ min: 1, max: 50 }).withMessage('To pole wymaga od 1 do 50 znaków')
];

export const isLoged = async (req, res, next) => {
  const token = req.headers['token'];

  const verify = token !== 'null' && await jwt.verify(token, jwtConfig.secret);

  if (!verify) return res.send({ errors: [{ msg: 'Nie jesteś zalogowany', param: 'comm' }] });

  next();
};

export const isAdmin = async (req, res, next) => {
  const token = req.headers['token'];

  const user = token !== 'null' && await jwt.verify(token, jwtConfig.secret);

  if (!user.admin) return res.send({ errors: [{ msg: 'Nie jesteś adminem', param: 'comm' }] });

  next();
};

export const isDoctor = async (req, res, next) => {
  const token = req.headers['token'];

  const user = token !== 'null' && await jwt.verify(token, jwtConfig.secret);

  if (user.admin) return res.send({ errors: [{ msg: 'Nie jesteś Doktorem', param: 'comm' }] });

  next();
};
