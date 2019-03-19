import passport from 'passport';
import passportJWT from 'passport-jwt';
import local from 'passport-local';
import User from '../models/User';
import jwtConfig from '../config/jwt';
import { createHash, isValidPassword } from '../helpers/bcrypt';

const LocalStrategy = local.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

passport.use('login', new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password'
}, async (login, password, done) => {
  const user = await User.findOne({
    where: { login }
  });

  if (!user || (user && !isValidPassword(user, password))) {
    return done({
      errors: [{
        param: 'login',
        msg: 'hasło lub login są niepoprawne',
      }]
    }, false);
  }

  return done(null, user);
}));

passport.use('register', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
  }, async (login, password, done) => {
    const user = await User.findOne({
      where: { login }
    });

    if (user) {
      return done({
        errors: [{ location: 'body', param: 'login', value: '', msg: 'Zarejestrowano już użytkownika o danym loginie' }]

      }, false);
    }

    done(null, {
      login,
      password: createHash(password),
    });
  }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtConfig.secret,
  }, async (jwtPayload, done) => {
    const user = await User.findById(jwtPayload.id);
    user ? done(null, user) : done([{ message: 'Nie jesteś zalogowany' }], null);
  }
));
