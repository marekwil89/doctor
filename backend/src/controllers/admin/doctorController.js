import express from 'express';
import User from '../../models/User';
import { isLoged, isAdmin } from '../../validators/authValidator';

const router = express.Router();

router.get('/', isLoged, isAdmin, async (req, res) => {
  const queries = req.query;

  const users = await User.findAll({
    where: {
      ...queries.fullName && { fullName: { $like: `%${queries.fullName}%` } },
      ...queries.lastVisit && { lastVisit: queries.lastVisit },
      admin: false
    }
  });

  return res.send(users);
});

router.delete('/:id', isLoged, isAdmin, async (req, res) => {
  const { id } = req.params;

  await User.destroy({ where: { id } });

  return res.send({ status: true });
});

router.put('/:id', isLoged, isAdmin, async (req, res) => {
  const { id } = req.params;

  const idExist = await User.findByPk(id);
  if (!idExist) return res.send({ errors: [{ msg: 'Użytkownik o takim id nie istnieje w bazie', param: 'fullName' }] });

  const updated = await User.update({
    paid: '',
  }, { where: { id } });

  return res.send({ status: updated });
});

export default router;
