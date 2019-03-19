import bCrypt from 'bcrypt-nodejs';

export const isValidPassword = (user, password) => bCrypt.compareSync(password, user.password);

export const createHash = password => bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);