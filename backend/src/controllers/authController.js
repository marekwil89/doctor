import express from 'express';
import { validationResult } from 'express-validator/check';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import jwtConfig from '../config/jwt';
import { isLoged, loginValidator, registerValidator } from '../validators/authValidator';
import { createHash } from '../helpers/bcrypt';
import { getLogedUser } from '../helpers/getLogedUser';

const router = express.Router();

router.get('/loged', isLoged, async (req, res) => {
  const { id } = await getLogedUser(req.headers);

  const user = await User.findOne({
    where: { id }
  });

  return res.send({ user });
});

router.post('/login', loginValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.json({ errors: errors.array() });

  passport.authenticate('login', async (err, user) => {
    if (err) {
      return res.send(err);
    }

    req.login(user, { session: false }, err => {
      const token = jwt.sign(user.toJSON(), jwtConfig.secret);

      return res.send({
        token,
        status: true
      });
    });
  }, err => console.log(err))
  (req, res);
});

router.post('/register', registerValidator, async (req, res) => {
  passport.authenticate('register', async (err, auth) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.json({ errors: errors.array() });

    if (err) {
      return res.send(err);
    }

    const user = {
      ...auth,
      ...req.body,
      password: createHash(req.body.password),
      admin: false,
      paid: ''
    };

    const newUser = await User.create(user);

    return res.send({ status: true });
  })(req, res);
});

export default router;
