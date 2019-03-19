import moment from 'moment';
import { getLogedUser } from '../helpers/getLogedUser';
import User from '../models/User';

export const isPaid = async (req, res, next) => {

  const { id } = await getLogedUser(req.headers);

  const { paid } = await User.findOne({
    where: { id }
  });

  if (!moment(paid).isValid()) {
    return res.send({ errors: [{ msg: 'Data nie jest poprawna', param: 'comm' }] });
  }

  if (!moment(paid).add(30, 'days').isAfter(moment())) {
    return res.send({ errors: [{ msg: 'Brak licencji', param: 'comm' }] });
  }

  next();
};
