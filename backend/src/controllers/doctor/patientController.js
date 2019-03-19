import express from 'express';
import { validationResult } from 'express-validator/check';
import Patient from '../../models/Patient';
import patientValidator from '../../validators/patientValidator';
import { isLoged, isDoctor } from '../../validators/authValidator';
import { getLogedUser } from '../../helpers/getLogedUser';
import { isPaid } from '../../validators/paymentValidator';

const router = express.Router();

router.put('/', isLoged, isDoctor, isPaid, patientValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.json({ errors: errors.array() });

  const { id, fullName, lastVisit } = req.body;

  const idExist = await Patient.findByPk(id);
  if (!idExist) return res.send({ errors: [{ msg: 'Pacjent o takim id nie istnieje', param: 'fullName' }] });

  const updated = await Patient.update({
    fullName,
    lastVisit
  }, { where: { id } });

  return res.send({ status: true });
});

router.post('/', isLoged, isDoctor, isPaid, patientValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.json({ errors: errors.array() });

  const { fullName, lastVisit } = req.body;

  const { id } = await getLogedUser(req.headers);

  const newPatient = await Patient.create({
    userId: id,
    fullName,
    lastVisit
  });

  return res.send({ status: true });
});

router.get('/', isLoged, isDoctor, isPaid, async (req, res) => {
  const { id } = await getLogedUser(req.headers);

  const queries = req.query;

  const patients = await Patient.findAll({
    where: {
      ...queries.fullName && { fullName: { $like: `%${queries.fullName}%` } },
      ...queries.lastVisit && { lastVisit: queries.lastVisit },
      userId: id
    }
  });

  res.send(patients);
});

router.get('/:patientId', isLoged, isDoctor, isPaid, async (req, res) => {
  const { patientId } = req.params;
  const { id } = await getLogedUser(req.headers);

  const patient = await Patient.findOne({
    where: {
      id: patientId,
      userId: id
    }
  });

  res.send(patient);
});

router.delete('/:id', isLoged, isDoctor, isPaid, async (req, res) => {
  const { id } = req.params;

  await Patient.destroy({ where: { id } });

  return res.send({ status: true });
});

export default router;
